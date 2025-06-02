import React, { useState, useMemo } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select"

export function DatePickerCustom({ selectedDate, setSelectedDate, message }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const years = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 101 }, (_, i) => now.getFullYear() - i)
  }, [])

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const handleYearChange = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
  }

  const handleMonthChange = (month) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span className="text-muted-foreground">{ message }</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4">
        <div className="flex justify-between items-center mb-3 space-x-2">
          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(val) => handleYearChange(parseInt(val))}
          >
            <SelectTrigger className="w-[80px] text-sm pr-2">
              <div className="flex items-center justify-between w-full">
                <span>{currentMonth.getFullYear()}</span>
              </div>
            </SelectTrigger>

            <SelectContent className="max-h-48 overflow-auto">
              <SelectGroup>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={currentMonth.getMonth().toString()}
            onValueChange={(val) => handleMonthChange(parseInt(val))}
          >
            <SelectTrigger className="w-[90px] text-sm pr-2">
              <div className="flex items-center justify-between w-full">
                <span>{months[currentMonth.getMonth()]}</span>
              </div>
            </SelectTrigger>

            <SelectContent className="max-h-48 overflow-auto">
              <SelectGroup>
                {months.map((monthName, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          max={new Date()}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
