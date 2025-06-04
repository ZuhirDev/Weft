import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, CreditCard, ArrowUpRight, ArrowRight } from "lucide-react";
import { useAccount } from '@account/context/AccountContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import { Link } from 'react-router-dom';
import TRANSACTION_ROUTES from '@/modules/transaction/routes/paths';
import { Skeleton } from '@/components/ui/skeleton';

const AccountRecentTrans = () => {
  const { selectedAccount } = useAccount();

  return (
    <>
      {selectedAccount ? (
        <div className="relative group px-4 lg:px-0">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md pointer-events-none" />

          <Card className="relative z-10 border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-card/90 dark:backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="relative z-10 border-b border-border/50 bg-gradient-to-r from-zinc-50 to-gray-50 dark:from-zinc-800 dark:to-zinc-900 px-4 py-2">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight">
                Transactions
              </CardTitle>
              <CardDescription className="mt-0.5 text-muted-foreground dark:text-muted-foreground/80 text-sm leading-tight">
                Your latest account activity
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 p-4 space-y-3">
              {selectedAccount.transactions.map(transaction => (
                <div
                  key={`${selectedAccount.id}-${transaction.id}`}
                  className="group flex items-center gap-3 p-2 rounded-xl transition duration-300 hover:bg-muted/30 dark:hover:bg-muted/50"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition duration-300 ${
                      transaction.type === "deposit"
                        ? "bg-emerald-900 group-hover:bg-emerald-800"
                        : transaction.type === "withdrawal"
                        ? "bg-rose-900 group-hover:bg-rose-800"
                        : "bg-blue-900 group-hover:bg-blue-800"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-emerald-400" />
                    ) : transaction.type === "withdrawal" ? (
                      <ArrowUpRight className="h-5 w-5 text-rose-400" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium capitalize tracking-wide text-foreground dark:text-foreground text-sm">
                        {transaction.type}
                      </p>
                      <div
                        className={`font-semibold text-base transition duration-300 ${
                          transaction.type === "deposit"
                            ? "text-emerald-400 group-hover:text-emerald-300"
                            : "text-rose-400 group-hover:text-rose-300"
                        }`}
                      >
                        <VisibilityWrapper>
                          €{transaction.amount.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                        </VisibilityWrapper>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <time dateTime={transaction.date} className="text-xs text-muted-foreground dark:text-muted-foreground/80">
                        {new Date(transaction.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>

                      {transaction.concept && (
                        <Badge
                          variant="outline"
                          className="text-xs font-normal px-2 py-0.5 transition duration-300 group-hover:bg-muted/70 dark:group-hover:bg-muted/50 hidden sm:inline-block"
                        >
                          {transaction.concept}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center ">
                <Link
                  to={TRANSACTION_ROUTES.TRANSACTION}
                  className="inline-flex items-center text-primary hover:underline cursor-pointer transition text-sm"
                >
                  View more transactions
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-5 w-10 rounded" />
            </div>
          ))}

          <div className="flex justify-center mt-2">
            <Skeleton className="h-7 w-36 rounded" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountRecentTrans;
