import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, CreditCard, CheckCircle2 } from "lucide-react";
import { useAccount } from '@account/context/AccountContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const AccountSelector = () => {
  const { accounts, selectedAccount, changeSelectedAccount } = useAccount();

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto relative px-2">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(75%_100%_at_50%_0%,hsl(var(--primary)/0.15)_0,transparent_75%)]" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between h-auto p-0 border overflow-hidden",
              "bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-all duration-300",
            )}
          >
            <div className="flex items-center gap-4 w-full p-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-white shadow-lg border border-transparent dark:border-black">
                <CreditCard className="h-6 w-6 text-white dark:text-black" />
              </div>

              <div className="flex flex-col flex-1 text-left min-w-0">
                <span className="font-semibold text-base truncate">
                  {selectedAccount?.alias || "Select an account"}
                </span>
                <span className="text-sm text-muted-foreground truncate">
                  {selectedAccount ? (
                    <>
                      <span>{selectedAccount.iban} • </span>
                      <VisibilityWrapper showButton={false}>
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: "EUR"
                        }).format(selectedAccount.balance)}
                      </VisibilityWrapper>
                    </>
                  ) : (
                    "No account selected"
                  )}
                </span>
              </div>

              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={cn(
            "w-full max-w-xs sm:max-w-sm p-2",
            "bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
            "border border-primary/10 shadow-xl"
          )}
        >
          <div className="text-sm font-medium text-muted-foreground px-3 py-2 mb-1">
            Select an account
          </div>

          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg cursor-pointer",
                "transition-colors duration-200",
                "focus:bg-accent/80 focus:text-accent-foreground",
                account.id === selectedAccount?.id && "bg-accent"
              )}
              onClick={() => changeSelectedAccount(account)}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-white shadow-lg border border-transparent dark:border-black">
                <CreditCard className="h-6 w-6 text-white dark:text-black" />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium truncate">{account.name}</span>
                <span className="text-sm text-muted-foreground truncate">
                  {account.iban} • {account.type}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1 text-right">
                <div className="font-medium whitespace-nowrap">
                  <VisibilityWrapper>
                    {new Intl.NumberFormat("en", {
                      style: "currency",
                      currency: "EUR"
                    }).format(account.balance)}
                  </VisibilityWrapper>
                </div>
                {account.id === selectedAccount?.id && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountSelector;
