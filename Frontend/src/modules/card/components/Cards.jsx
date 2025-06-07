import React from 'react';
import { useCard } from '@card/context/CardContext';
import { Wifi, Lock } from 'lucide-react';
import NewCard from './NewCard';
import { useAccount } from '@/modules/account/context/AccountContext';
import MasterCard from '@/assets/img/Mastercard.svg';

const Cards = () => {
  const { cards } = useCard();
  const { selectedAccount } = useAccount();

  const filteredCards = cards.filter((card) => card.account_id === selectedAccount?.id);

  const handleCardClick = (card) => {
    console.log(card);
  };

  return (
    <div className="flex flex-wrap justify-start gap-4">
      {filteredCards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card)}
          className="relative group w-80 h-48"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur pointer-events-none transition duration-500 group-hover:opacity-50 group-hover:blur-md" />

          <div className="relative w-full h-full overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-white rounded-xl p-4 flex flex-col justify-between shadow-lg border border-white/10 transition duration-300">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] z-0 rounded-xl" />
            <div className="absolute top-0 -right-12 w-28 h-28 bg-primary/20 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 -left-12 w-28 h-28 bg-primary/20 rounded-full blur-3xl z-0" />

            {card.status === 'blocked' && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 rounded-xl">
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-border shadow-sm text-xs font-medium text-destructive">
                  <Lock className="h-4 w-4" />
                  CARD BLOCKED
                </div>
              </div>
            )}

            <div className="flex justify-between items-center z-10 relative">
              <div className="flex items-center space-x-1">
                <div className="text-[10px] opacity-80">Weft Bank</div>
                <div className="h-5 w-10">
                  <img src={MasterCard} alt="Mastercard logo" className="h-full w-auto" />
                </div>
              </div>
              <div className="text-sm font-bold">{card.type || 'Credit'} Card</div>
            </div>

            <div className="flex items-center space-x-2 mt-2 z-10 relative">
              <div className="h-5 w-8 bg-orange-500 rounded-sm p-1 grid grid-cols-2 gap-0.5 shadow-inner">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-orange-300 h-full rounded-sm" />
                ))}
              </div>
              <Wifi className="h-4 w-4" />
            </div>

            <div className="space-y-2 mt-3 z-10 relative">
              <div className="text-sm font-mono tracking-wider">{card.card_number}</div>
              <div className="flex justify-between text-[11px] opacity-90">
                <div>
                  <div className="uppercase text-[10px]">Holder</div>
                  <div>{card.holder}</div>
                </div>
                <div>
                  <div className="uppercase text-[10px]">Expires</div>
                  <div>{card.expiration_date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <NewCard />
    </div>
  );
};

export default Cards;
