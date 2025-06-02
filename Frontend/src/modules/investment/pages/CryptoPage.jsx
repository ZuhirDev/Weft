import React, { useEffect, useState } from 'react';
import { TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const borderColors = {
  BTCUSDT: 'border-yellow-500 shadow-yellow-400/50 bg-gradient-to-tr from-yellow-50 to-yellow-100',
  ETHUSDT: 'border-blue-500 shadow-blue-400/50 bg-gradient-to-tr from-blue-50 to-blue-100',
  BNBUSDT: 'border-yellow-400 shadow-yellow-300/50 bg-gradient-to-tr from-yellow-50 to-yellow-100',
  SOLUSDT: 'border-indigo-500 shadow-indigo-400/50 bg-gradient-to-tr from-indigo-50 to-indigo-100',
  ADAUSDT: 'border-red-500 shadow-red-400/50 bg-gradient-to-tr from-red-50 to-red-100',
  XRPUSDT: 'border-purple-500 shadow-purple-400/50 bg-gradient-to-tr from-purple-50 to-purple-100',
};

const trendingPairs = Object.keys(borderColors);

const Price = ({ value }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <p
      className={`text-2xl font-bold transition-transform duration-500 ${
        animate ? 'scale-110 text-yellow-600' : 'text-gray-900'
      }`}
    >
      {value} USDT
    </p>
  );
};


const ChangePercent = ({ value }) => {
  const isPositive = parseFloat(value) >= 0;
  return (
    <p
      className={`text-sm font-semibold flex items-center justify-center gap-1 ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {isPositive ? (
        <ArrowUpIcon className="w-4 h-4 animate-bounce text-green-500" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 animate-bounce text-red-500" />
      )}
      {value}%
    </p>
  );
};


const CryptoPage = () => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      const res = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      if (!res.ok) throw new Error('Error fetching data');

      const data = await res.json();

      const filteredData = data
        .filter((item) => trendingPairs.includes(item.symbol))
        .map((item) => ({
          symbol: item.symbol,
          price: parseFloat(item.lastPrice).toFixed(2),
          change: parseFloat(item.priceChangePercent).toFixed(2),
        }));

      setPrices(filteredData);
      setError(null);
    } catch (err) {
      setError('Error fetching crypto prices.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(() => {
      fetchPrices();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">

      <Alert variant="info" className="max-w-3xl mx-auto rounded-lg">
        <AlertTitle className="text-lg font-semibold">Coming Soon</AlertTitle>
        <AlertDescription>
          We’re working on enabling crypto purchases and sales directly from this platform. Stay tuned!
        </AlertDescription>
      </Alert>


      <Card className="max-w-5xl mx-auto shadow-xl border-none bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-primary animate-pulse">
            <TrendingUpIcon className="w-6 h-6" />
            Trending Cryptos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive" className="max-w-md mx-auto rounded-lg">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {prices.map((crypto) => {
                const borderColor = borderColors[crypto.symbol] || 'border-gray-300 shadow-gray-300/50 bg-gray-50';
                return (
                  <Card
                    key={crypto.symbol}
                    className={`text-center shadow-lg border-4 rounded-xl p-5 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${borderColor}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-wide">{crypto.symbol.replace('USDT', '')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Price value={crypto.price} />
                      <ChangePercent value={crypto.change} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CryptoPage
