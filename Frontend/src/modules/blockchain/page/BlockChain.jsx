import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardView } from "@blockchain/components/DashboardView";
import { PortfolioView } from "@blockchain/components/PortfolioView";
import { useBlockChain } from "@blockchain/context/BlockChainContext";
import { Separator } from "@/components/ui/separator";

const BlockChain = () => {
  const { account, loading, connect } = useBlockChain();

    return (
        <div>

            {!account ? (
                <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-700">
                    <div className="mb-10 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 relative">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                        <BarChart3 className="size-20 text-primary relative z-10" />
                    </div>
                    <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">
                        Autenticación Requerida
                    </h2>
                    <p className="text-muted-foreground max-w-lg mb-10 text-lg font-medium leading-relaxed">
                        Conecte su billetera para acceder a la terminal de ejecución y operar en el mercado global.
                    </p>
                    <Button 
                        onClick={() => connect()} 
                        disabled={loading}
                        size="lg" 
                        className="rounded-xl px-12 h-14 font-bold uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
                    >
                        Conectar Billetera
                    </Button>
                </div>
            ) :  (
                <>
                    <DashboardView />
                    <Separator />
                    <PortfolioView account={account} />
                </>
            )}      
        </div>
    )
}

export default BlockChain
