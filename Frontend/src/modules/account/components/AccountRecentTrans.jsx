import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, CreditCard, ArrowUpRight } from "lucide-react";
import { useAccount } from '../context/AccountContext';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const AccountRecentTrans = () => {
  const { selectedAccount } = useAccount();


  if (!selectedAccount) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading transactions...</div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Transactions
            </CardTitle>
            <CardDescription className="mt-1 text-gray-500">
              Your latest account activity
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            {selectedAccount.transactions.length} transactions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {selectedAccount.transactions.map((transaction) => (
            <div
              key={`${selectedAccount.id}-${transaction.id}`}
              className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                transaction.type === "deposit"
                  ? "bg-emerald-50 group-hover:bg-emerald-100"
                  : transaction.type === "withdrawal"
                  ? "bg-rose-50 group-hover:bg-rose-100"
                  : "bg-blue-50 group-hover:bg-blue-100"
              }`}>
                {transaction.type === "deposit" ? (
                  <ArrowDownLeft className="h-6 w-6 text-emerald-600" />
                ) : transaction.type === "withdrawal" ? (
                  <ArrowUpRight className="h-6 w-6 text-rose-600" />
                ) : (
                  <CreditCard className="h-6 w-6 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium capitalize tracking-wide">
                    {transaction.type}
                  </p>
                  <div className={`font-semibold text-lg transition-all duration-300 ${
                    transaction.type === "deposit"
                      ? "text-emerald-600 group-hover:text-emerald-700"
                      : "text-rose-600 group-hover:text-rose-700"
                  }`}>
                    <VisibilityWrapper>
                    €{transaction.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}

                    </VisibilityWrapper>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <time
                    dateTime={transaction.date}
                    className="text-sm text-gray-500"
                  >
                    {new Date(transaction.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {transaction.concept && (
                    <Badge
                      variant="outline"
                      className="text-xs font-normal px-2 py-0.5 transition-all duration-300 group-hover:bg-white"
                    >
                      {transaction.concept}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountRecentTrans;