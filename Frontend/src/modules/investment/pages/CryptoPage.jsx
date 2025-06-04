import React, { useEffect, useState } from 'react';
import { TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import useModal from '@/hooks/useModal';

const borderColors = {
  BTCEUR: 'border-yellow-500 shadow-yellow-400/50 bg-gradient-to-tr from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-400 dark:shadow-yellow-700/50',
  ETHEUR: 'border-blue-500 shadow-blue-400/50 bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 dark:border-blue-400 dark:shadow-blue-700/50',
  SOLEUR: 'border-indigo-500 shadow-indigo-400/50 bg-gradient-to-tr from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 dark:border-indigo-400 dark:shadow-indigo-700/50',
  ADAEUR: 'border-red-500 shadow-red-400/50 bg-gradient-to-tr from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 dark:border-red-400 dark:shadow-red-700/50',
  XRPEUR: 'border-purple-500 shadow-purple-400/50 bg-gradient-to-tr from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 dark:border-purple-400 dark:shadow-purple-700/50',
  DOGEEUR: 'border-yellow-600 shadow-yellow-500/50 bg-gradient-to-tr from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 dark:border-yellow-600 dark:shadow-yellow-700/50',
  USDTUSD: 'border-green-500 shadow-green-400/50 bg-gradient-to-tr from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 dark:border-green-400 dark:shadow-green-700/50',
};


const trendingPairs = Object.keys(borderColors);

const Price = ({ value }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [value]);

  const numberValue = Number(value);

  const formattedValue = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);

  return (
    <p
      className={`text-2xl font-bold transition-transform duration-500 ${
        animate ? 'scale-110 text-yellow-600 dark:text-yellow-400' : 'text-zinc-900 dark:text-zinc-200'
      }`}
    >
      {formattedValue} EUR
    </p>
  );
};

const ChangePercent = ({ value }) => {
  const isPositive = parseFloat(value) >= 0;
  return (
    <p
      className={`text-sm font-semibold flex items-center justify-center gap-1 ${
        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}
    >
      {isPositive ? (
        <ArrowUpIcon className="w-4 h-4 animate-bounce text-green-500 dark:text-green-300" />
      ) : (
        <ArrowDownIcon className="w-4 h-4 animate-bounce text-red-500 dark:text-red-300" />
      )}
      {value}%
    </p>
  );
};

const SkeletonCard = () => (
  <div className="text-center shadow-lg border-4 rounded-xl p-5 border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
    <Skeleton className="h-6 w-20 mx-auto mb-4 rounded" />
    <Skeleton className="h-10 w-32 mx-auto mb-2 rounded" />
    <Skeleton className="h-5 w-20 mx-auto rounded" />
  </div>
);

const CryptoPage = () => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);
  const { isOpen, open, close } = useModal();

  const fetchPrices = async () => {
    open();
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
    } finally {
      close();
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
        <AlertTitle className="text-lg font-semibold dark:text-zinc-200">Coming Soon</AlertTitle>
        <AlertDescription className="dark:text-zinc-300">
          We’re working on enabling crypto purchases and sales directly from this platform. Stay tuned!
        </AlertDescription>
      </Alert>

      <Card className="max-w-5xl mx-auto shadow-xl border-none bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-primary animate-pulse dark:text-primary">
            <TrendingUpIcon className="w-6 h-6" />
            Trending Cryptos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="max-w-md mx-auto rounded-lg">
              <AlertTitle className="dark:text-zinc-200">Error</AlertTitle>
              <AlertDescription className="dark:text-zinc-300">{error}</AlertDescription>
            </Alert>
          )}

          {isOpen ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {prices.map((crypto) => {
                const borderColor =
                  borderColors[crypto.symbol] ||
                  'border-zinc-300 shadow-zinc-300/50 bg-zinc-50 dark:border-zinc-700 dark:shadow-zinc-700/50 dark:bg-zinc-900';
                return (
                  <Card
                    key={crypto.symbol}
                    className={`text-center shadow-lg border-4 rounded-xl p-5 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${borderColor}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-wide dark:text-zinc-200">
                        {crypto.symbol.replace('EUR', '')}
                      </CardTitle>
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
};

export default CryptoPage;
