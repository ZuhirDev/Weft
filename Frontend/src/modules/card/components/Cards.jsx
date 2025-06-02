import React from 'react';
import { useCard } from '@card/context/CardContext';
import { Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NewCard from './NewCard';
import { Badge } from '@/components/ui/badge';
import { useAccount } from '@/modules/account/context/AccountContext';

const Cards = () => {
  const { cards } = useCard();
  const { selectedAccount } = useAccount();

  const carta = cards.filter((card) => card.account_id === selectedAccount.id)

  const handleCardClick = (card) => {
    console.log("selected Card", card)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    { carta.map((card) => (
    <div
      key={card.id}
      className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      onClick={() => handleCardClick(card)}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`}
      ></div>

      <Card className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className={`bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="space-y-1">
                <div className="text-white/80 text-xs font-mono tracking-wider">{card.network}</div>
                <div className="text-white text-sm font-bold">{card.type.toUpperCase()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${card.status === "quantum" ? "bg-white animate-pulse" : "bg-white/60"}`}
                ></div>
                <Wifi className="w-4 h-4 text-white/80" />
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <div className="text-white text-xl font-mono tracking-[0.3em] mb-2">
                {card.card_number}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-white/40 rounded"></div>
                <div className="w-12 h-1 bg-white/60 rounded"></div>
                <div className="w-6 h-1 bg-white/40 rounded"></div>
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <div className="text-white/60 text-xs font-mono mb-1">HOLDER</div>
                <div className="text-white text-sm font-semibold">{card.holderName}</div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs font-mono mb-1">EXPIRES</div>
                <div className="text-white text-sm font-semibold">{card.expiration_date}</div>
              </div>
            </div>

          </div>

          <div className="p-4 bg-black/40 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <div>
                {card.alias && <div className="text-white font-medium text-sm mb-1">{card.alias}</div>}
      <Badge
        variant={
          card.status === 'active' ? 'default' :
          card.status === 'blocked' ? 'destructive' :
          'secondary'
        }
      >
        {card.status.toUpperCase()}
      </Badge>              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    ))}
    <NewCard />
    </div>
  );
};

export default Cards;
