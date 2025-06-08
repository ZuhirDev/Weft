import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wallet, CreditCard, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '@/modules/account/context/AccountContext';
import { useCard } from '@/modules/card/context/CardContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import { useTranslation } from 'react-i18next';

const AccountOverview = () => {
  const { accounts } = useAccount();
  const { cards } = useCard();
  const { t } = useTranslation();

  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <div className="relative group grid grid-cols-1 gap-4 px-4 lg:grid-cols-3">
      {accounts && cards.length ? (
        <>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md" />

          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs sm:text-sm">
            <CardHeader className="flex items-center gap-3">
              <Wallet className="h-6 w-6 text-green-600" />
              <div>
                <CardDescription>{t('account:accountOverview.totalBalance')}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                <VisibilityWrapper>
                  {totalBalance.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 2,
                  })}
                </VisibilityWrapper>
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs sm:text-sm">
            <CardHeader className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <CardDescription>{t('account:accountOverview.numberOfAccounts')}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {accounts.length}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>

          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs sm:text-sm">
            <CardHeader className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-purple-600" />
              <div>
                <CardDescription>{t('account:accountOverview.numberOfCards')}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {cards.length}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>
        </>
      ) : (
        <>
        {[...Array(3)].map((_, i) => (
            <Card
            key={i}
            className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs sm:text-sm"
            >
            <CardHeader className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded" />
                <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-7 w-32 rounded" />
                </div>
            </CardHeader>
            </Card>
        ))}
        </>
      )}
    </div>
  );
};

export default AccountOverview;
