import React from 'react'
import { ChevronRight, CreditCard, Wifi } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useAccount } from '../context/AccountContext';
import { Link } from 'react-router-dom';

const AccountCreditCard = () => {

  const { selectedAccount } = useAccount();

  if(!selectedAccount) return <div>cargando ...</div>;

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold text-white">Your Cards</h2>

      <Card
        key={selectedAccount.card.id}
        className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]"
      >
        <CardHeader className="flex justify-between items-start p-0 mb-6">
          <div>
            <p className="text-white/70 text-sm">{selectedAccount.card?.alias}</p>
            <p className="text-white/70 text-sm">{selectedAccount.card.type}</p>
            <p className="text-white font-medium">{selectedAccount.card.card_number}</p>
          </div>
          <div className="text-white/90">
            <Wifi size={20} className="rotate-90" />
          </div>
        </CardHeader>

        <CardContent className="flex justify-between items-end p-0">
          <div className="text-white">
            <p className="text-xs text-white/70 mb-1">Expires</p>
            <p className="font-medium">{selectedAccount.card.expiration_date}</p>
          </div>
          <CreditCard size={24} className="text-white/90" />
        </CardContent>

        {selectedAccount.card.status === "active" && (
          <div className="mt-4 inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
            <span className="text-xs text-emerald-300">Active</span>
          </div>
        )}
      </Card>

      <Link to="/card" className="block">
        <div className="flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer 
                        bg-gray-100 hover:bg-gray-200 
                        dark:bg-white/5 dark:hover:bg-white/10">
          <span className="font-medium text-gray-800 dark:text-white">
            View all cards
          </span>
          <ChevronRight className="text-gray-500 dark:text-white/70" size={20} />
        </div>
      </Link>
    </div>
  )
}

export default AccountCreditCard
