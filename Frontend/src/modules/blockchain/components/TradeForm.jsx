import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buyAsset, sellAsset, getRequiredCommission, getAssetBalance } from "@blockchain/services/assets";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ethers } from "ethers";

export function TradeForm({ ticker, onClose }) {
  const [action, setAction] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ethBalance, setEthBalance] = useState(0n);
  const [requiredEth, setRequiredEth] = useState(0n);
  const [ownedQuantity, setOwnedQuantity] = useState(0);

  const rawPrice = parseFloat(ticker.price.replace(/,/g, ""));
  const total = rawPrice * quantity;

  useEffect(() => {
    const fetchFinances = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0].address;
          const balance = await provider.getBalance(address);
          setEthBalance(balance);

          const assetBal = await getAssetBalance(address, ticker.symbol);
          setOwnedQuantity(Number(assetBal));
        }

        const required = await getRequiredCommission(quantity || 1, rawPrice);
        setRequiredEth(required);
      } catch (err) {
        console.error("Error fetching finances", err);
      }
    };
    fetchFinances();
  }, [quantity, rawPrice, ticker.symbol]);

  const insufficientFunds = requiredEth > 0n && ethBalance < requiredEth;
  const insufficientAssets = action === "sell" && quantity > ownedQuantity;

  const handleTrade = async () => {
    if (quantity <= 0 || isNaN(quantity)) return toast.error("Cantidad inválida");
    setLoading(true);
    try {
      if (action === "buy") {
        await buyAsset(ticker.symbol, quantity, rawPrice);
        toast.success(`Orden ejecutada: Compra de ${quantity} ${ticker.symbol}`);
      } else {
        await sellAsset(ticker.symbol, quantity, rawPrice);
        toast.success(`Orden ejecutada: Venta de ${quantity} ${ticker.symbol}`);
      }
      onClose();
    } catch (error) {
      console.error("Trade Error:", error);
      toast.error(error.message || "Error al procesar la operación en la blockchain");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 pt-4 border-t border-white/5 space-y-4">
      <div className="flex bg-white/5 rounded-lg p-1 gap-1">
        <button
          onClick={() => setAction("buy")}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${action === "buy" ? "bg-green-600 text-white shadow-md shadow-green-900/20" : "text-muted-foreground hover:bg-white/5"}`}
        >
          Comprar
        </button>
        <button
          onClick={() => {
            if (ownedQuantity > 0) setAction("sell");
          }}
          disabled={ownedQuantity === 0}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${action === "sell" ? "bg-red-600 text-white shadow-md shadow-red-900/20" : "text-muted-foreground hover:bg-white/5"} ${ownedQuantity === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          Vender {ownedQuantity > 0 ? `(${ownedQuantity})` : ""}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Cantidad de {ticker.symbol}
          </label>
          {action === "sell" && (
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
              Disponible: {ownedQuantity}
            </span>
          )}
        </div>
        <Input 
          type="number" 
          min="1" 
          max={action === "sell" ? ownedQuantity : undefined}
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="h-12 bg-background border-white/10 text-lg font-black rounded-lg px-4 text-foreground"
        />
      </div>

      <div className="space-y-2">
        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Valor Total (USDT)</span>
          <span className="text-xl font-black text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className={`p-4 rounded-xl border ${insufficientFunds ? "border-red-500/50 bg-red-500/10" : "border-white/5 bg-white/[0.02]"} flex justify-between items-center transition-colors`}>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex flex-col gap-1">
            Comisión de Red (ETH)
            {insufficientFunds && <span className="text-red-500 text-[9px] font-black tracking-tighter">SALDO INSUFICIENTE</span>}
          </span>
          <span className={`text-lg font-black tabular-nums tracking-tighter ${insufficientFunds ? "text-red-500" : "text-foreground"}`}>
            {ethers.formatEther(requiredEth)} ETH
          </span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onClose} className="flex-1 rounded-lg text-xs font-bold uppercase tracking-wider" disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleTrade}
          disabled={loading || insufficientFunds || insufficientAssets}
          className={`flex-1 rounded-lg font-bold uppercase tracking-widest text-xs text-white shadow-md ${(insufficientFunds || insufficientAssets) ? "bg-red-950 text-red-500/50 cursor-not-allowed border border-red-900/50" : action === "buy" ? "bg-green-600 hover:bg-green-700 shadow-green-900/20" : "bg-red-600 hover:bg-red-700 shadow-red-900/20"}`}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : insufficientFunds ? "Sin fondos ETH" : insufficientAssets ? "Activos insuficientes" : (action === "buy" ? "Ejecutar Compra" : "Ejecutar Venta")}
        </Button>
      </div>
    </div>
  );
}