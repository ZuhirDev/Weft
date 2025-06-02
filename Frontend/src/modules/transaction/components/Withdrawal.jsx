import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import useModal from '@/hooks/useModal';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useAccount } from '@/modules/account/context/AccountContext';
import { Textarea } from '@/components/ui/textarea';
import { useTransaction } from '../context/TransactionContext';
import { toast } from 'sonner';


const Withdrawal = () => {

    const { t } = useTranslation();
    const withdrawSchema = z.object({
        amount: z.coerce.number().min(1).int(),
        concept: z.string().nullable(),
    });

    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({ 
        resolver: zodResolver(withdrawSchema),
    });

    const { isOpen, open, close } = useModal();
    const { selectedAccount } = useAccount();
    const { withdraw } = useTransaction();

    
    const onSubmit = async (data) => {
        
        const info = {
            iban: selectedAccount?.iban,
            type: 'withdraw',
            ...data,
        }

        try {
            const response = await withdraw(info);
        } catch (error) {
            console.log("Error", error.response.data.message)
            toast.error(error.response.data.message || 'ha ocurrido un error')
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
        <Upload className="h-5 w-5 text-red-500" />
            <span>Withdraw</span>
        </Button>

        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="fixed z-50 sm:max-w-[425px] w-full bg-white shadow-lg rounded-md">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-green-500/5 opacity-10 rounded-lg -z-10" />

                <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
        <Upload className="h-5 w-5 text-red-500" />
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
    );
}

export default Withdrawal
