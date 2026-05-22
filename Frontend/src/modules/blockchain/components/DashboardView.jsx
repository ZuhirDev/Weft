import { useEffect, useState, useRef } from "react";
import { Activity, ArrowUpRight, ArrowDownRight, LineChart, ShieldCheck, TrendingUp, Volume2, Zap, Clock, Check, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TradeForm } from "@blockchain/components/TradeForm";
import { useBlockChain } from "@blockchain/context/BlockChainContext";
import { getMyPortfolio } from "@blockchain/services/assets";
import btcIcon from "@blockchain/assets/bitcoin-color-icon.svg";
import ethIcon from "@blockchain/assets/ethereum-eth-icon.svg";
import bnbIcon from "@blockchain/assets/binance-coin-bnb-icon.svg";
import solIcon from "@blockchain/assets/solana-sol-icon.svg";
import xrpIcon from "@blockchain/assets/xrp-coin-icon.svg";
import adaIcon from "@blockchain/assets/cardano-ada-icon.svg";
import dogeIcon from "@blockchain/assets/dogecoin-doge-icon.svg";
import avaxIcon from "@blockchain/assets/avalanche-avax-icon.svg";

const TOP_SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", 
  "XRPUSDT", "ADAUSDT", "DOGEUSDT", "AVAXUSDT",
];

const CRYPTO_ICONS = {
  BTC: btcIcon,
  ETH: ethIcon,
  BNB: bnbIcon,
  SOL: solIcon,
  XRP: xrpIcon,
  ADA: adaIcon,
  DOGE: dogeIcon,
  AVAX: avaxIcon,
};

const CRYPTO_NAMES = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  BNB: "BNB Chain",
  SOL: "Solana",
  XRP: "Ripple",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  AVAX: "Avalanche",
};

function MiniSparkline({ isPositive, dataPoints }) {
  const width = 80;
  const height = 32;
  const padding = 2;

  if (dataPoints.length < 2) {
    const placeholderPoints = Array.from({ length: 12 }, (_, i) => 
      Math.sin(i * 0.5) * 10 + 15
    );
    return <MiniSparkline isPositive={isPositive} dataPoints={placeholderPoints} />;
  }

  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = max - min || 1;

  const points = dataPoints.map((val, i) => {
    const x = padding + (i / (dataPoints.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;
  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathData} L ${width - padding},${height} L ${padding},${height} Z`}
        fill={`url(#grad-${isPositive ? 'up' : 'down'})`}
      />
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardView() {
  const [tickers, setTickers] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("INICIANDO...");
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [priceHistory, setPriceHistory] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const updateCountRef = useRef(0);

  const { account } = useBlockChain();
  const [ownedAssets, setOwnedAssets] = useState(new Set());

  useEffect(() => {
    if (!account) {
      setOwnedAssets(new Set());
      return;
    }
    const fetchPortfolio = async () => {
      try {
        const items = await getMyPortfolio(account);
        const owned = new Set(items.filter(item => Number(item.quantity) > 0).map(item => item.isin));
        setOwnedAssets(owned);
      } catch (err) {
        console.error("Error fetching portfolio for dashboard:", err);
      }
    };
    fetchPortfolio();
  }, [account]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr");

    ws.onopen = () => setConnectionStatus("EN LÍNEA");
    ws.onclose = () => setConnectionStatus("DESCONECTADO");
    ws.onerror = () => setConnectionStatus("ERROR DE CONEXIÓN");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedTickers = {};
      
      data.forEach((ticker) => {
        if (TOP_SYMBOLS.includes(ticker.s)) {
          const c = parseFloat(ticker.c);
          const o = parseFloat(ticker.o);
          const changeAbs = c - o;
          const changePercent = (changeAbs / o) * 100;

          updatedTickers[ticker.s] = {
            symbol: ticker.s.replace("USDT", ""),
            price: c.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
            changePercent: changePercent.toFixed(2),
            changeAbs: changeAbs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
            volume: (parseFloat(ticker.q) / 1000000).toFixed(2) + "M",
            high: parseFloat(ticker.h).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
            low: parseFloat(ticker.l).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
            open: o.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
          };

          setPriceHistory(prev => {
            const key = ticker.s;
            const existing = prev[key] || [];
            const updated = [...existing, c].slice(-20);
            return { ...prev, [key]: updated };
          });
        }
      });

      setTickers((prev) => {
        const next = { ...prev, ...updatedTickers };
        setSelectedTicker(current => {
          if (current) {
            return next[`${current.symbol}USDT`] || current;
          }
          return current;
        });
        return next;
      });

      updateCountRef.current += 1;
      setLastUpdate(new Date());
    };

    return () => {
      ws.close();
    };
  }, []);

  const allTickers = Object.values(tickers);
  const totalVolume = allTickers.reduce((sum, t) => sum + parseFloat(t.volume), 0);
  const gainers = allTickers.filter(t => parseFloat(t.changePercent) >= 0).length;
  const losers = allTickers.length - gainers;
  const topGainer = allTickers.length > 0
    ? allTickers.reduce((best, t) => parseFloat(t.changePercent) > parseFloat(best.changePercent) ? t : best)
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-black tracking-tight uppercase text-foreground">
              Market Overview
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Cotizaciones en tiempo real · {allTickers.length} activos monitorizados
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
            <Clock className="size-3" />
            {lastUpdate.toLocaleTimeString()}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm">
            <div className={`size-1.5 rounded-full ${connectionStatus.includes("EN LÍNEA") ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span>WS: {connectionStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/[0.02] border-white/[0.06]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Volume2 className="size-3.5" />
              Volumen Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-black tabular-nums tracking-tight">
              ${totalVolume.toFixed(0)}M
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/[0.06]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp className="size-3.5" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topGainer ? (
              <div className="flex items-center gap-2">
                <img src={CRYPTO_ICONS[topGainer.symbol]} alt={topGainer.symbol} className="size-5" />
                <span className="text-xl font-black tabular-nums tracking-tight">{topGainer.symbol}</span>
                <Badge variant="secondary" className="text-[9px] font-black text-green-500 bg-green-500/10">
                  +{topGainer.changePercent}%
                </Badge>
              </div>
            ) : (
              <div className="h-7 bg-white/5 animate-pulse rounded-md w-20" />
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/[0.06]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-green-500/80 flex items-center gap-2">
              <ArrowUpRight className="size-3.5" />
              En Alza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-black tabular-nums tracking-tight text-green-500">{gainers}</span>
            <span className="text-xs text-muted-foreground ml-1">activos</span>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/[0.06]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-red-500/80 flex items-center gap-2">
              <ArrowDownRight className="size-3.5" />
              En Baja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-black tabular-nums tracking-tight text-red-500">{losers}</span>
            <span className="text-xs text-muted-foreground ml-1">activos</span>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="size-4 text-primary" />
          <h2 className="text-sm font-black uppercase tracking-widest">Activos Digitales</h2>
          <Separator className="flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOP_SYMBOLS.map((symbolRaw) => {
            const data = tickers[symbolRaw];
            const isLoading = !data;
            const symbol = symbolRaw.replace("USDT", "");
            const isPositive = data && parseFloat(data.changePercent) >= 0;
            const history = priceHistory[symbolRaw] || [];

            return (
              <Card 
                key={symbolRaw} 
                onClick={() => !isLoading && setSelectedTicker(data)}
                className={`relative overflow-hidden bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 ${isLoading ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
              >
                {ownedAssets.has(symbol) && !isLoading && (
                  <div className="absolute top-0 right-0 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary border-l-[40px] border-l-transparent opacity-90 drop-shadow-md"></div><Check className="absolute top-1.5 right-1.5 size-3.5 text-white stroke-[3]" />
                    
                    <Coins className="absolute top-1.5 right-1.5 size-3.5 text-primary-foreground stroke-[3]" />
                  </div>
                )}

                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner overflow-hidden p-1.5">
                        <img 
                          src={CRYPTO_ICONS[symbol]} 
                          alt={symbol} 
                          className="size-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-black text-base tracking-tight">{symbol}</h3>
                        <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                          {CRYPTO_NAMES[symbol]}
                        </p>
                      </div>
                    </div>
                    
                    {!isLoading && (
                      <div className="flex flex-col items-end gap-1.5 z-10 relative">
                        <Badge 
                          variant="secondary"
                          className={`text-[10px] font-black px-2 py-0.5 ${isPositive ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}
                        >
                          {isPositive ? <ArrowUpRight className="size-3 mr-0.5" /> : <ArrowDownRight className="size-3 mr-0.5" />}
                          {isPositive ? "+" : ""}{data.changePercent}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-2 relative z-10">
                    {isLoading ? (
                      <div className="h-8 bg-white/5 animate-pulse rounded-md w-2/3" />
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xl font-black tabular-nums tracking-tighter flex items-baseline gap-1">
                          <span className="text-muted-foreground text-xs font-bold">$</span>
                          {data.price}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground mt-1.5 flex items-center gap-1.5">
                          <Zap className="size-2.5" />
                          Vol: <span className="text-foreground font-bold">{data.volume}</span>
                        </span>
                      </div>
                    )}
                    {!isLoading && (
                      <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <MiniSparkline isPositive={!!isPositive} dataPoints={history} />
                      </div>
                    )}
                  </div>
                </CardContent>

                <div className={`absolute bottom-0 left-0 w-full h-[2px] transition-opacity ${isPositive ? 'bg-gradient-to-r from-transparent via-green-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-red-500/50 to-transparent'} opacity-0 group-hover:opacity-100`} />
              </Card>
            );
            
          })}
        </div>
      </div>

      <Dialog open={!!selectedTicker} onOpenChange={(open) => !open && setSelectedTicker(null)}>
        <DialogContent className="sm:max-w-[425px] border-white/10 bg-background/95 backdrop-blur-xl rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedTicker && (
                <div className="size-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shadow-inner overflow-hidden p-2">
                  <img 
                    src={CRYPTO_ICONS[selectedTicker.symbol]} 
                    alt={selectedTicker.symbol} 
                    className="size-full object-contain"
                  />
                </div>
              )}
              <div>
                <DialogTitle className="text-2xl font-black tracking-tighter uppercase">{selectedTicker?.symbol}</DialogTitle>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                  {selectedTicker && CRYPTO_NAMES[selectedTicker.symbol]} · Par USDT
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedTicker && (
            <div className="grid gap-5 py-2">
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-background border border-white/5 rounded-xl relative overflow-hidden shadow-inner">
                <span className="text-4xl font-black tabular-nums tracking-tighter flex items-baseline gap-1 relative z-10">
                  {selectedTicker.price}
                </span>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md mt-2 relative z-10 ${parseFloat(selectedTicker.changePercent) >= 0 ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
                  {parseFloat(selectedTicker.changePercent) >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {parseFloat(selectedTicker.changePercent) >= 0 ? "+" : ""}{selectedTicker.changePercent}% ({selectedTicker.changeAbs} USDT)
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <LineChart className="size-3" /> Máx 24h
                  </p>
                  <p className="text-sm font-black tabular-nums text-foreground">${selectedTicker.high}</p>
                </div>
                <div className="flex flex-col gap-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <LineChart className="size-3" /> Mín 24h
                  </p>
                  <p className="text-sm font-black tabular-nums text-foreground">${selectedTicker.low}</p>
                </div>
                <div className="flex flex-col gap-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="size-3" /> Apertura
                  </p>
                  <p className="text-sm font-black tabular-nums text-foreground">${selectedTicker.open}</p>
                </div>
              </div>
            </div>
          )}

          {selectedTicker && (
            <TradeForm 
              ticker={{ symbol: selectedTicker.symbol, price: selectedTicker.price }} 
              onClose={() => setSelectedTicker(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}