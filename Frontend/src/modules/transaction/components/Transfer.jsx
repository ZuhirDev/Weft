import useModal from '@/hooks/useModal'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import FormInput from '@/components/FormInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransaction } from '../context/TransactionContext';
import { useAccount } from '@/modules/account/context/AccountContext';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Transfer = () => {

    const transferSchema = z.object({
        destination_iban: z.string().length(24),
        transferType: z.string(),
        amount: z.coerce.number().min(1).int(),
        concept: z.string().nullable(),
    });

    const { handleSubmit, register, reset, setError, control,  formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(transferSchema),
    });
    const { isOpen, open, close } = useModal();
    const { transfer, external } = useTransaction();
    const { selectedAccount } = useAccount();

    if(!selectedAccount) return <div>cargando...</div>;


    const onSubmit = async (data) => {
        
        const info = {
            iban: selectedAccount?.iban,
            type: 'transfer',
            ...data,
        }
        console.log(info)
        console.log(info.transferType)
        try {
            if(info.transferType === 'internal') {
                const response = await transfer(info)

            }else if (info.transferType === 'external'){
                const response = await external(info);
            }
        } catch (error) {
            console.log("Error", error)
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
        <Send className="h-5 w-5 text-blue-500" />
            <span>Transferencia</span>
        </Button>
        
         <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/5 opacity-10 rounded-lg -z-10" />

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-blue-500" />
            Realizar Transferencia
          </DialogTitle>
          <DialogDescription>Transfiere fondos a otra cuenta</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">


            <div className="flex flex-col">

                <select
                    id="transferType"
                    {...register("transferType", { required: "Este campo es obligatorio" })}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Seleccione una opción</option>
                    <option value="internal">Cuenta del mismo banco</option>
                    <option value="external">Cuenta externa (otro banco)</option>
                </select>
                {errors.transferType && (
                    <p className="text-red-500 text-xs mt-1">{errors.transferType.message}</p>
                )}
            </div>


            <FormInput
                name="destination_iban"
                type="text"
                register={register}
                disabled={isSubmitting}
                placeholder="iban destino"
                error={errors.destination_iban}
            />
  
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

export default Transfer
