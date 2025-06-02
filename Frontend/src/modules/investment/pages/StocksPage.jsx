import React, { useEffect, useState } from 'react';
import { TrendingUpIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Mapeo de colores para cada stock
const borderColors = {
  AAPL: 'border-green-600',
  MSFT: 'border-blue-600',
  AMZN: 'border-yellow-500',
  GOOGL: 'border-red-600',
  TSLA: 'border-pink-500',
  NFLX: 'border-purple-600',
  NVDA: 'border-emerald-600',
  META: 'border-indigo-600',
  JPM: 'border-gray-600',
  KO: 'border-red-400',
};

const trendingStocks = Object.keys(borderColors);

// Cambia por tu API Key de Finnhub
const FINNHUB_API_KEY = 'd0t1369r01qid5qc2u30d0t1369r01qid5qc2u3g';

const fetchStockPrice = async (symbol) => {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error fetching stock price');
  return await res.json();
};

const StocksPage = () => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
    //   const results = await Promise.all(
    //     trendingStocks.map(async (symbol) => {
    //       const data = await fetchStockPrice(symbol);
    //       // data: {c: current price, dp: percent change}
    //       return {
    //         symbol,
    //         price: data.c.toFixed(2),
    //         change: data.dp.toFixed(2),
    //       };
    //     })
    //   );
    //   setPrices(results);
    //   setError(null);
    } catch (err) {
      setError('Error fetching stock prices.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-4">

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary">
            <TrendingUpIcon className="w-5 h-5 animate-bounce text-primary" />
            Trending Stocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive" className="animate-shake">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {prices.map((stock) => {
                const borderColor = borderColors[stock.symbol] || 'border-gray-300';
                return (
                  <Card
                    key={stock.symbol}
                    className={`text-center shadow-lg border-4 rounded-lg transform transition-transform hover:scale-105 hover:shadow-2xl ${borderColor}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${stock.price}</p>
                      <p className={`text-sm ${parseFloat(stock.change) >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                        {stock.change}%
                      </p>
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

export default StocksPage;
