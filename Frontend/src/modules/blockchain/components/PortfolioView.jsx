import { useEffect, useState, useCallback } from "react";
import { getTransactionHistory } from "@blockchain/services/assets";
import { ethers } from "ethers";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History } from "lucide-react";

export function PortfolioView({ account }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = useCallback(async () => {
    if (!account) return;
    try {
      const txs = await getTransactionHistory(account)

      setHistory(txs.sort((a, b) => Number(b.timestamp) - Number(a.timestamp)));
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    fetchPortfolio();

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const onBlock = () => {
        fetchPortfolio();
      };
      provider.on("block", onBlock);

      return () => {
        provider.off("block", onBlock);
      };
    }
  }, [fetchPortfolio]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 bg-white/5" />
            <Skeleton className="h-4 w-48 bg-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Skeleton className="h-[180px] w-full bg-white/5 rounded-xl" />
          <Skeleton className="h-[180px] w-full bg-white/5 rounded-xl" />
          <Skeleton className="h-[180px] w-full bg-white/5 rounded-xl" />
          <Skeleton className="h-[180px] w-full bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 animate-in fade-in duration-700">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-black tracking-tight uppercase text-foreground">
            Historial de Operaciones
          </h1>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Registro inmutable validado en la blockchain
        </p>
      </div>

      <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-white/5 rounded-[32px] bg-white/[0.01]">
            <div className="p-6 rounded-full bg-white/[0.02] border border-white/5 mb-6 shadow-inner">
              <History className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-foreground/80">Sin Movimientos</h3>
            <p className="text-muted-foreground max-w-sm text-xs font-bold uppercase tracking-widest">
              Aún no has realizado ninguna transacción on-chain.
            </p>
          </div>
        ) : (
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden backdrop-blur-3xl">
            <Table>
              <TableHeader className="bg-white/[0.02] border-b border-white/[0.05]">
                <TableRow className="border-transparent hover:bg-transparent">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14 pl-6">Fecha (On-Chain)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Operación</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14">Símbolo</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14 text-right">Monto Nominal</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-14 text-right pr-6">Gas / Comisión</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((tx, idx) => {
                  const date = new Date(Number(tx.timestamp) * 1000);
                  const dateStr = date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
                  const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const isBuy = tx.opType === "BUY";
                  
                  return (
                    <TableRow key={idx} className="border-b border-white/[0.02] bg-transparent hover:bg-white/[0.03] transition-colors group">
                      <TableCell className="py-4 pl-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-foreground/90">{dateStr}</span>
                          <span className="text-[10px] font-mono text-muted-foreground/70">{timeStr}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-[9px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-widest flex items-center w-fit gap-1.5 ${isBuy ? "bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]" : "bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"}`}>
                          <div className={`size-1.5 rounded-full ${isBuy ? 'bg-green-500' : 'bg-red-500'}`} />
                          {isBuy ? "Compra" : "Venta"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-white/[0.05] flex items-center justify-center font-black text-xs text-primary border border-white/10 group-hover:border-primary/50 transition-colors">
                            {tx.isin.substring(0, 1)}
                          </div>
                          <span className="font-black text-sm uppercase tracking-tighter text-foreground">{tx.isin}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <span className="font-mono text-sm font-bold text-foreground">
                          {isBuy ? "+" : "-"}{tx.amount.toString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-4 pr-6">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                            {ethers.formatEther(tx.commissionPaid)}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">ETH</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}