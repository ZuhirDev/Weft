import React, { useEffect, useState } from 'react'
import { useAccount } from '@account/context/AccountContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Landmark } from 'lucide-react'
import VisibilityWrapper from '@/components/VisibilityWrapper'

const AccountCarousel = () => {

  const { accounts, selectedAccount, changeSelectedAccount } = useAccount();

  return (
    <div className="flex flex-wrap gap-4">
      {accounts.map(( account ) => (
        <Card
          key={account.id}
          onClick={() => changeSelectedAccount(account)}
          className={cn(
            "w-64 cursor-pointer transition-all duration-200 border-2 overflow-hidden",
            account.id === selectedAccount?.id
              ? "border-primary shadow-lg scale-[1.02]"
              : "border-transparent hover:border-primary/30",
            account.color || "bg-gradient-to-br from-blue-600/10 via-indigo-700/10 to-purple-800/10"
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white",
                  account.color || "bg-yellow-500"
                )}
              >
                <Landmark className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium truncate">{account.name}</span>
                <Badge variant="outline" className="mt-1 text-xs">
                  {account.type}
                </Badge>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-bold">
                <VisibilityWrapper children={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(account.balance)} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {account.iban.slice(0, 4)}...{account.iban.slice(-4)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default AccountCarousel
