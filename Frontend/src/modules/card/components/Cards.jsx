import React from 'react';
import { useCard } from '@card/context/CardContext';
import { Wifi } from 'lucide-react';
import NewCard from './NewCard';
import { useAccount } from '@/modules/account/context/AccountContext';
import MasterCard from '@/assets/img/Mastercard.svg'

const Cards = () => {
  const { cards } = useCard();
  const { selectedAccount } = useAccount();

  const carta = cards.filter((card) => card.account_id === selectedAccount.id)

  const handleCardClick = (card) => {
    console.log(card)
  }

  const colors = [
    "bg-gradient-to-r from-primary/40 via-primary/60 to-primary/80",
    "bg-gradient-to-r from-primary/30 via-primary/50 to-primary/70",
    "bg-gradient-to-r from-primary/50 to-primary/70",
    "bg-gradient-to-r from-primary/60 to-primary/90",
    "bg-gradient-to-r from-primary/30 via-primary/40 to-primary/60",
    "bg-gradient-to-r from-primary/20 via-primary/40 to-primary/60",
    "bg-gradient-to-r from-primary/25 to-primary/50",
    "bg-gradient-to-r from-primary/10 via-primary/30 to-primary/50",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  return (
    <div className="flex flex-wrap justify-start gap-4">
      {carta.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card)}
          className={`relative w-80 h-48 rounded-xl p-6 flex flex-col justify-between text-white transition duration-300 ${getRandomColor()} ${card.status === 'blocked' && 'opacity-50 '}`}
        >
          {card.status === 'blocked' && (
            <div className="absolute top-2 right-2 bg-red-700 bg-opacity-90 text-white px-3 py-1 text-xs font-semibold rounded shadow-lg">
              Blocked
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-xs opacity-80">Weft Bank</div>
              <div className="h-6 w-12">
                <img src={MasterCard} alt="Mastercard logo" className="h-full w-auto" />
              </div>
            </div>
            <div className="text-xl font-bold">{card.type || "Credit"} Card</div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-6 w-10 bg-orange-500 rounded-sm p-1 grid grid-cols-2 gap-0.5 shadow-inner">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-orange-300 h-full rounded-sm" />
              ))}
            </div>
            <Wifi className="h-5 w-5" />
          </div>

          <div className="space-y-3">
            <div className="text-lg font-mono tracking-wider">{card.card_number}</div>
            <div className="flex justify-between text-sm opacity-90">
              <div>
                <div className="text-xs uppercase">Holder</div>
                <div>{card.holder}</div>
              </div>
              <div>
                <div className="text-xs uppercase">Expirate</div>
                <div>{card.expiration_date}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <NewCard />
    </div>
  )
};

export default Cards;
