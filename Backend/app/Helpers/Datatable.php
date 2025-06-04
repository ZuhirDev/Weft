<?php

namespace App\Helpers;

use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;


class Datatable
{
    private $type;
    private $paramFilters;
    private $paramPage;
    private $paramPageSize;
    private $paramOrderByCollection;
    private $dataQuery;
    private $response;
    private $totalCount;
    private $isMongo;
    private $paramGlobalSearch;

    public static function of($query)
    {
        if (is_array($query)) {
            return new self(collect($query), 'array');
        } elseif (get_class($query) === 'Illuminate\Support\Collection' || get_class($query) === 'Illuminate\Database\Eloquent\Collection') {
            return new self($query, 'array');
        } else {
            $isMongo = get_class($query) === 'Jenssegers\Mongodb\Eloquent\Builder';

            return new self($query, 'eloquent', $isMongo);
        }
    }

    public function __construct($dataQuery, $type, $isMongo = false)
    {
        $this->type = $type;
        $this->dataQuery = $dataQuery;
        $this->isMongo = $isMongo;


        $this->prepareUrlQuery();
        $this->globalSearch();
        $this->filterByColumns();
        $this->orderBy();
    }

    public function toJson()
    {
        $this->totalCount();
        $this->paginate();
        $this->makeResponse();

        return new JsonResponse($this->response, 200);
    }

    public function toResponse()
    {
        return $this->toJson();
    }

    private function prepareUrlQuery()
    {
        $params = request()->all();

        $this->paramFilters = Arr::get($params, 'filters', []);
        $this->paramPage = intval($params['page']);
        $this->paramPageSize = intval($params['pageSize']);
        $this->paramGlobalSearch = Arr::get($params, 'globalSearch', []);
        $this->paramOrderByCollection = Arr::get($params, 'orderByCollection', []);

        $this->paramFilters = array_map(function ($filter) {
            if ($filter === null) abort(400, 'Error json filter');
            return $filter;
        }, $this->paramFilters);
    }

    private function globalSearch()
    {
        if ($this->paramGlobalSearch) {
            $this->smartGlobalSearch($this->paramGlobalSearch['search']);
        }
    }

    private function filterByColumns()
    {
        $filters = $this->paramFilters;
        if (count($filters) == 0 || null) {
            return;
        }

        foreach ($filters as $filter) {
            $columnField = Arr::get($filter, 'field');
            $columnType = Arr::get($filter, 'column.type', 'string');
            $operator = Arr::get($filter, 'operator');
            $value = Arr::get($filter, 'value');

            if ($value) {
                switch ($columnType) {
                    case 'string':
                        if (is_array($value)) {
                            $this->dataQuery = $this->dataQuery->whereIn($columnField, $value);
                        } else {
                            $parseValue = str_replace('%', '\%', $value);
                            $parseValue = "%$parseValue%";
                            $this->dataQuery->whereRaw('LOWER('.$columnField.') like ?', '%'.strtolower($parseValue).'%');
                        }
                        break;
                    case 'boolean':
                    case 'numeric':
                        if (is_array($value)) {
                            $this->dataQuery = $this->dataQuery->whereIn($columnField, $value);
                        } else {
                            $this->dataQuery = $this->dataQuery->where($columnField, $operator, $value);
                        }
                        break;
                    case 'date':
                        try {
                            $date = Carbon::createFromFormat('Y-m-d', $value);
                            if ($this->isMongo) {
                                $date->hour = 0;
                                $date->minute = 0;
                                $date->second = 0;
                                $dateStart = $date->copy();
                                $date->hour = 23;
                                $date->minute = 59;
                                $date->second = 59;
                                $dateEnd = $date->copy();
                                $this->dataQuery = $this->dataQuery->whereBetween($columnField, [$dateStart, $dateEnd]);
                            } else {
                                $this->dataQuery = $this->dataQuery->whereDate($columnField, $operator, $date);
                            }
                        } catch (\Exception $e) {
                            throw new Exception('Parseando date', $value);
                        }
                        break;
                    default:
                        throw new \Exception("Eloquent. No se filtrar por $columnType y operador $operator", 1);
                        break;
                }
            }
        }
    
    }

    private function totalCount()
    {
        $this->totalCount = $this->dataQuery->toBase()->getCountForPagination();
    }

    private function makeResponse()
    {
        $this->response = [
            'data' =>  $this->dataQuery->get(),
            'page' => $this->paramPage,
            'totalCount' => $this->totalCount,
        ];
    }

    /**
     * Order by columns.
     *
     * @param  array  $orderByCollection
     */
    private function orderBy()
    {
        if (count($this->paramOrderByCollection) > 0) {
            foreach($this->paramOrderByCollection as $orderBy){
                $column = $orderBy['column'];
                $direction = $orderBy['direction'];

                $this->dataQuery->orderBy($column, $direction);
            }
        }
    }

    private function paginate()
    {
        $page = max(1, $this->paramPage);
        $offset = ($page - 1) * $this->paramPageSize;
        $this->dataQuery = $this->dataQuery->skip($offset)->take($this->paramPageSize);
    }

    /**
     * Perform multi-term search by splitting keyword into
     * individual words and searches for each of them.
     *
     * @param  string  $keyword
     */
    private function smartGlobalSearch($keyword)
    {
        collect(explode(' ', $keyword))
            ->reject(function ($keyword) {
                return trim($keyword) === '';
            })
            ->each(function ($keyword) {
                $this->_globalSearch($keyword);
            });
    }

    private function _globalSearch($keyword)
    {
        $columns = $this->paramGlobalSearch['columns'];

        $this->dataQuery->where(function ($query) use ($keyword, $columns) {
            collect($columns)->each(function ($column) use ($keyword, $query) {
                $this->compileQuerySearch($query, $column, $keyword);
            });
        });
    }

    /**
     * Compile query builder where clause depending on configurations.
     *
     * @param  mixed  $query
     * @param  string  $column
     * @param  string  $keyword
     * @param  string  $boolean
     */
    private function compileQuerySearch($query, $column, $keyword, $boolean = 'or')
    {
        $columnField = Arr::get($column, 'column', Arr::get($column, 'field'));
        $query->{$boolean.'Where'}($columnField, 'like', $this->prepareKeyword($keyword));
    }

    /**
     * Prepare search keyword based on configurations.
     *
     * @param  string  $keyword
     * @return string
     */
    protected function prepareKeyword($keyword)
    {
        $keyword = "%$keyword%";
        return $keyword;
    }
}
