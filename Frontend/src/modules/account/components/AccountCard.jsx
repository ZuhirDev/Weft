import React from 'react';
import { Lock, Landmark, Users, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAccount } from '@account/context/AccountContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const AccountCard = () => {
  const { selectedAccount } = useAccount();

  return (
    <div className="relative group">
      {selectedAccount ? (
        <>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md" />

          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs sm:text-sm">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute top-0 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

            <CardHeader className="relative z-10 pb-2 sm:pb-0 px-4 sm:px-6">
              <div className="flex items-center justify-between flex-wrap gap-y-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg">
                    {selectedAccount.status === 'blocked' ? (
                      <Lock className="h-6 w-6 sm:h-7 sm:w-7" />
                    ) : (
                      <Landmark className="h-6 w-6 sm:h-7 sm:w-7" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-base sm:text-xl font-semibold">
                      {selectedAccount.alias}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground font-medium">
                        {selectedAccount.type}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          selectedAccount.status === 'active'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {selectedAccount.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Available Balance</p>
                <div className="flex items-end gap-4">
                  <div className="text-2xl sm:text-4xl font-bold tracking-tight">
                    <VisibilityWrapper>
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 2,
                      }).format(selectedAccount.balance)}
                    </VisibilityWrapper>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 sm:pt-6 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">IBAN</p>
                    <p className="font-mono text-xs tracking-wide break-all">
                      {selectedAccount.iban}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">HOLDERS</p>
                    <p className="text-xl font-bold">
                      {selectedAccount.holders.length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            {selectedAccount.status === 'blocked' && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                <div className="flex items-center gap-2 sm:gap-3 bg-card/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-border shadow-lg">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                  <span className="text-xs font-medium tracking-wider text-destructive">
                    ACCOUNT BLOCKED
                  </span>
                </div>
              </div>
            )}
          </Card>
        </>
      ) : (
        <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-28 sm:w-32 rounded" />
              <Skeleton className="h-4 w-16 sm:w-20 rounded" />
            </div>
          </div>

          <div className="space-y-2 pt-2 sm:pt-4">
            <Skeleton className="h-3 w-28 sm:w-32 rounded" />
            <Skeleton className="h-7 w-40 sm:w-52 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 sm:pt-6 border-t border-border/50">
            <div className="space-y-2">
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-5 w-10 rounded" />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AccountCard;
