import React from 'react'
import { ChevronRight, Wifi, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccount } from '../context/AccountContext';
import { Link } from 'react-router-dom';
import MasterCard from '@/assets/img/Mastercard.svg'
import CARD_ROUTES from '@/modules/card/routes/paths';

const AccountCreditCard = () => {
  const { selectedAccount } = useAccount();

  return (
    <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      {selectedAccount ? (
        <>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur pointer-events-none transition duration-500 group-hover:opacity-50 group-hover:blur-md" />

          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-white rounded-xl p-4 sm:p-6 flex flex-col justify-between transition duration-300 shadow-lg">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute top-0 -right-16 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-16 sm:-left-20 w-32 h-32 sm:w-40 sm:h-40 bg-primary/20 rounded-full blur-3xl" />

            {selectedAccount.card.status === 'blocked' && (
              <div className="absolute top-2 right-2 bg-red-700 bg-opacity-90 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded shadow-sm z-10">
                Blocked
              </div>
            )}

            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="text-[10px] sm:text-xs opacity-80">Weft Bank</div>
                <div className="h-5 w-10 sm:h-6 sm:w-12">
                  <img src={MasterCard} alt="Mastercard logo" className="h-full w-auto" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-bold">{selectedAccount.card.type || "Credit"} Card</div>
            </div>

            <div className="flex items-center space-x-2 relative z-10 mt-2 sm:mt-3">
              <div className="h-5 w-8 sm:h-6 sm:w-10 bg-orange-500 rounded-sm p-1 grid grid-cols-2 gap-0.5 shadow-inner">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-orange-300 h-full rounded-sm" />
                ))}
              </div>
              <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div className="space-y-2 sm:space-y-3 relative z-10 mt-3 sm:mt-4">
              <div className="text-base sm:text-lg font-mono tracking-wider">{selectedAccount.card.card_number}</div>
              <div className="flex justify-between text-xs sm:text-sm opacity-90">
                <div>
                  <div className="uppercase">Holder</div>
                  <div>{selectedAccount.card.holder}</div>
                </div>
                <div>
                  <div className="uppercase">Expires</div>
                  <div>{selectedAccount.card.expiration_date}</div>
                </div>
              </div>
            </div>

            {selectedAccount.card.status === 'blocked' && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 rounded-2xl">
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-border shadow-sm text-xs sm:text-sm">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                  <span className="font-medium tracking-wider text-destructive">
                    CARD BLOCKED
                  </span>
                </div>
              </div>
            )}
          </Card>

          <Link to={CARD_ROUTES.CARD} className="block mt-4 sm:mt-6 relative z-20">
            <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-sm sm:text-base">
              <span className="font-medium text-gray-800 dark:text-white">View all cards</span>
              <ChevronRight className="text-gray-500 dark:text-white/70" size={20} />
            </div>
          </Link>
        </>
      ) : (
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-20 sm:w-24" />
              <Skeleton className="h-5 w-24 sm:h-6 sm:w-28 rounded-md" />
            </div>

            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-10 rounded-sm" />
            </div>

            <Skeleton className="h-6 w-full sm:w-4/5" />

            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default AccountCreditCard;
