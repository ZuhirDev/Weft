import React from 'react';
import { Lock, Landmark } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAccount } from '../context/AccountContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const AccountCard = () => {
  const { selectedAccount } = useAccount();

  if (!selectedAccount) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-inner">
              {selectedAccount.status === 'blocked' ? (
                <Lock className="h-6 w-6 text-white" />
              ) : (
                <Landmark className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white">
                {selectedAccount.alias}
              </CardTitle>
              <p className="text-white/70 text-sm font-medium">
                Cuenta {selectedAccount.type}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-medium text-white/60 tracking-wider">
            SALDO DISPONIBLE
          </p>
<div className="text-4xl font-bold text-white">
  <VisibilityWrapper>
    {new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(selectedAccount.balance)}
  </VisibilityWrapper>
</div>

        </div>

        <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <p className="text-xs font-medium text-white/60 tracking-wider">
              IBAN
            </p>
            <p className="font-mono text-sm text-white/90 tracking-wider break-all">
              {selectedAccount.iban}
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p className="text-xs font-medium text-white/60 tracking-wider">
              TITULARES
            </p>
            <p className="text-2xl font-bold text-white/90">
              {selectedAccount.holders.length}
            </p>
          </div>
        </div>
      </CardContent>

      {selectedAccount.status === 'blocked' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20">
            <Lock className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white tracking-wider">
              CUENTA BLOQUEADA
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AccountCard;