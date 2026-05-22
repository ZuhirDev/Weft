import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";
import { connectWallet } from "@blockchain/services/wallet";
import { getContractOwner } from "@blockchain/services/assets";

const BlockChainContext = createContext(null);

export const BlockChainProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      const acc = await connectWallet();
      setAccount(acc);

      try {
        const ownerAddress = await getContractOwner();
        const isAdmin = acc.toLowerCase() === ownerAddress.toLowerCase();
        if (isAdmin) {
          toast.info("Modo Broker activado", { description: "Tienes permisos de administrador." });
        } else {
          toast.success("Conectado como Cliente");
        }
      } catch (err) {
        console.warn("No se pudo obtener owner del contrato:", err);
      }
    } catch (error) {
      toast.error(error?.message || "Error al conectar la wallet");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
  }, []);

  const value = {
    account,
    loading,
    connect,
    disconnect,
  };

  return <BlockChainContext.Provider value={value}>{children}</BlockChainContext.Provider>;
};

export const useBlockChain = () => {
  const context = useContext(BlockChainContext);
  if (!context) {
    throw new Error("useBlockChain debe estar dentro del proveedor BlockChainProvider");
  }
  return context;
};