import useModal from '@/hooks/useModal'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import FormInput from '@/components/FormInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransaction } from '../context/TransactionContext';
import { useAccount } from '@/modules/account/context/AccountContext';
import { Input } from '@/components/ui/input';

const Deposit = () => {

    const depositSchema = z.object({
        amount: z.coerce.number().min(1).int(),
        concept: z.string().nullable(),
    });

    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(depositSchema),
    });
    const { isOpen, open, close } = useModal();
    const { deposit } = useTransaction();
    const { selectedAccount } = useAccount();

    if(!selectedAccount) return <div>cargando...</div>;


    const onSubmit = async (data) => {
        
        const info = {
            iban: selectedAccount?.iban,
            type: 'withdraw',
            ...data,
        }

        try {
            const response = await deposit(info);
        } catch (error) {
            console.log("Error", error.response.data.message)
        }finally{
            reset();
            close();
        }
    }


    return (
    <>
        <Button
            onClick={open}
            variant="outline"
            className="w-full h-20 flex flex-col items-center justify-center gap-1"
        >
        <Download className="h-5 w-5 text-green-500" />
            <span>Deposito</span>
        </Button>

        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="fixed z-50 sm:max-w-[425px] w-full bg-white shadow-lg rounded-md">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-green-500/5 opacity-10 rounded-lg -z-10" />

                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5 text-green-500" />
                        Realizar Depósito
                    </DialogTitle>
                    <DialogDescription>
                        Ingresa fondos a tu cuenta
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

                    <FormInput
                        name="amount"
                        type="number"
                        register={register}
                        disabled={isSubmitting}
                        placeholder="Cantidad"
                        error={errors.amount}
                    />

                        <Textarea
                            name="concept"
                            rows={3}
                            placeholder="Añade una concept"
                            {...register("concept")}
                        />
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={close}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            variant="outline"
                            className=" p-3 bg-primary text-white rounded-lg focus:outline-none"
                        >
                            {isSubmitting ? "Procesando..." : "Confirmar Depósito"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default Deposit
