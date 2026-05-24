import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

export function WalletStatus({ account }) {
  const [balance, setBalance] = useState("0.0000");

  const fetchBalance = useCallback(async () => {
    if (!window.ethereum || !account) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(account);
      const etherString = ethers.formatEther(balanceWei);
      setBalance(Number(etherString).toFixed(4));
    } catch (error) {
      console.error("Error al obtener el saldo:", error);
    }
  }, [account]);

  useEffect(() => {
    fetchBalance();

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      const onBlock = () => {
        fetchBalance();
      };
      
      provider.on("block", onBlock);
      
      return () => {
        provider.off("block", onBlock);
      };
    }
  }, [fetchBalance]);

  if (!account) return null;

  return (
  <div className="flex items-center gap-3 px-3 py-1.5 border border-border bg-card rounded-xl shadow-sm">
    <div className="flex flex-col items-end">
      <span className="text-muted-foreground font-bold uppercase tracking-widest text-[8px]">
        Wallet
      </span>
      <span className="font-black text-green-500 text-sm tabular-nums">
        {balance} ETH
      </span>
    </div>
    
    <div className="h-6 w-[1px] bg-border" />
    
    <div className="px-2 py-1 bg-secondary rounded-md border border-border/50 text-secondary-foreground font-mono text-xs flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      {account.slice(0, 6)}...{account.slice(-4)}
    </div>
  </div>
  );
}