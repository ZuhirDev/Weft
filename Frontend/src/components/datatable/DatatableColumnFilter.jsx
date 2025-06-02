import React, { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import MultiSelect from "../MultiSelect"

const DatatableColumnFilter = ({ column }) => {
  const colDef = column.columnDef
  const isMultiSelect = colDef.enableMultiSelect
  const items = colDef.multiSelectOptions || []
  const displayField = colDef.multiSelectDisplayField || "name"

  const [inputValue, setInputValue] = useState("")
  const [multiValue, setMultiValue] = useState([])

  useEffect(() => {
    if (isMultiSelect) {
      const filterVal = column.getFilterValue() || []
      const selected = items.filter((item) => filterVal.includes(item.id))
      setMultiValue(selected)
    } else {
      setInputValue(column.getFilterValue() || "")
    }
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
          <Search className="h-3.5 w-3.5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Filtrar por {colDef.header}
          </p>

          {isMultiSelect ? (
            <MultiSelect
              items={items}
              value={multiValue}
              onValueChange={(newVal) => {
                setMultiValue(newVal)
                column.setFilterValue(newVal.map((i) => i.id))
              }}
              displayField={displayField}
              placeholder="Selecciona opciones..."
              searchPlaceholder="Buscar..."
              emptyText="No se encontraron opciones."
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`Filtrar ${colDef.header}...`}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  column.setFilterValue(e.target.value)
                }}
                className="h-8"
              />
              {inputValue && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setInputValue("")
                    column.setFilterValue("")
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DatatableColumnFilter
