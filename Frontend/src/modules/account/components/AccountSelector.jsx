import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, CreditCard, CheckCircle2 } from "lucide-react"
import { useAccount } from '@account/context/AccountContext'
import VisibilityWrapper from '@/components/VisibilityWrapper'

const AccountSelector = () => {
  const { accounts, selectedAccount, changeSelectedAccount } = useAccount()

  return (
    <div className="w-full max-w-md mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 text-left text-white h-auto py-3 px-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-white">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-medium truncate">
                  {selectedAccount?.alias || "Selecciona una cuenta"}
                </span>
                <span className="text-sm text-white/80 truncate">
                
                {selectedAccount ? (
                  <>
                    <span>{selectedAccount.iban} •</span>{' '}
                    <VisibilityWrapper showButton={false}>
                      {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(selectedAccount.balance)}
                    </VisibilityWrapper>
                  </>
                ) : (
                  "Sin cuenta seleccionada"
                )}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-[360px] p-2 rounded-xl shadow-lg bg-white">
          <div className="text-sm font-medium text-muted-foreground px-2 py-1.5">
            Selecciona una cuenta
          </div>

          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              className={cn(
                "flex items-center gap-3 py-3 px-3 cursor-pointer rounded-md hover:bg-gray-100",
                account.id === selectedAccount.id && "bg-muted"
              )}
              onClick={() => changeSelectedAccount(account)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white">
                <CreditCard className="h-5 w-5" />
              </div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-medium truncate">{account.name}</span>
                <span className="text-sm text-muted-foreground truncate">
                  {account.iban} • {account.type}
                </span>
              </div>

              <div className="text-right">
                <div className="font-medium whitespace-nowrap">
                  <VisibilityWrapper>
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(account.balance)}
                  </VisibilityWrapper>
                </div>
                {account.id === selectedAccount.id && (
                  <CheckCircle2 className="h-4 w-4 text-primary ml-auto mt-1" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AccountSelector
