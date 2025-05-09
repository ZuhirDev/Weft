<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Services\AccountService;
// use App\Services\AccountService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Faker\Factory as Faker;

class AccountController extends Controller
{
    /**
     * https://laravel-news.com/controller-refactor   
     */
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::user();
    }
    
    private function AccountByIban($iban)
    {
        return Account::where('customer_id', $this->user->id)
                        ->where('iban', $iban)
                        ->first();
    }

    public function show(AccountService $accountService)
    {
        // $accounts = Account::where('customer_id', $this->user->id)->get();

        // if ($accounts->isEmpty()) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        // $accounts = $accounts->map(function($account){
        //     return [
        //         'id' => $account->id,
        //         'titulares' => $this->user->email,
        //         'alias' => $account->alias,
        //         'iban' => $account->iban,
        //         'balance' => (float) $account->balance,
        //         'swift' => $account->swift,
        //         'status' => $account->status,
        //         'type' => $account->type,
        //         'open_date' => $account->open_date,
        //     ];
        // });

        $accounts = $accountService->getAccountsByCustomerId($this->user->id);

        dd($accounts);

        return response()->json([
            'message' => 'Informacion de cuenta',
            'accounts' => $accounts,
        ]);
    }

    public function showAccountDetails(Request $request)
    {
        $account = $this->AccountByIban($request->iban);

        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        return response()->json([
            'message' => 'Detalles de cuenta',
            'account' => $account,
        ]);
    }


    public function store(Request $request)
    {
        $iban = $this->generateIban();

        $account = Account::create([
            'customer_id' => $this->user->id, 
            'iban' => $iban,
            'swift' => Account::getSwiftCode(),
            'status' => 'active',
        ]);

        if(!$account) return response()->json(['message' => 'ha ocurrido un error, repitelo de nuevo ']);

        return response()->json([
            'message' => 'Account created successfully',
            'account' => $account,
        ]);
    }

    public function destroy(Request $request)
    {

        $account = Account::where('customer_id', $this->user->id)
                            ->where('iban', $request->iban)
                            ->withTrashed()
                            ->first();

        if (!$account) {
            return response()->json(['message' => 'Cuenta no encontrada'], 404);
        }

        if ($account->deleted_at !== null) {
            return response()->json(['message' => 'La cuenta ya ha sido eliminada'], 400);
        }
    
        $account->delete();
    
        return response()->json(['message' => 'Cuenta eliminada correctamente']);
    }


    public function update(Request $request)
    {
        $account = $this->AccountByIban($request->iban);
    
        if (!$account) {
            return response()->json(['message' => 'Cuenta no encontrada'], 404);
        }
    
        $account->update([
            'status' => $request->status,
            'type' => $request->type,
        ]);
    
        return response()->json(['message' => 'Cuenta actualizada correctamente']);
    }
    

    public function searchByIban(Request $request)
    {
        $account = Account::where('iban', $request->iban)
                            ->first();

        if (!$account) {
            return response()->json(['message' => 'Cuenta no encontrada'], 404);
        }
    
        return response()->json([
            'account' => $account,
        ]);
    }

    public function changeStatus(Request $request)
    {
        // dd($request);
        $account = $this->AccountByIban($request->iban);

        if(!$account) return response()->json(['message' => 'Cuenta no encontrada.'], 404);

        $account->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'account' => $account,
            'message' => 'Cuenta actualizada exitosamente.',
        ]);
    }

    public function updateAlias(Request $request)
    {
        $account = $this->AccountByIban($request->iban);

        if(!$account) return response()->json(['message' => 'Cuenta no encontrada.'], 404);

        $account->update([
            'alias' => $request->alias,
        ]);

        return response()->json([
            'account' => $account,
            'message' => 'Cuenta actualizada exitosamente.',
        ]);
    }

    private function generateIban()
    {
        $faker = Faker::create();

        $iban = $faker->iban('ES');

        return $iban;
    }

    public function return_success($data)
    {
        return response()->json([
//DRY Laravel: Use Base Controller For Common Responses

        ]);
    }
}
