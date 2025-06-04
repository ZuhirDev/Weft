import useModal from '@/hooks/useModal'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import FormInput from '@/components/FormInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransaction } from '../context/TransactionContext';
import { useAccount } from '@/modules/account/context/AccountContext';

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
                className="h-20 w-full flex flex-col items-center justify-center gap-1 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
            >
                <Send className="h-5 w-5 text-blue-500" />
                <span>Transfer</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent className="sm:max-w-xl max-w-full bg-white dark:bg-zinc-900 border border-muted dark:border-zinc-700 rounded-lg shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/10 dark:to-muted/20 opacity-10 rounded-lg -z-10" />

                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    <Send className="h-5 w-5 text-blue-500" />
                    Make a Transfer
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                    Transfer funds to another account.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="transferType" className="text-zinc-900 dark:text-zinc-100">
                            Transfer Type
                        </Label>
                        <select
                            id="transferType"
                            {...register("transferType")}
                            className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select an option</option>
                            <option value="internal">Same Bank Account</option>
                            <option value="external">External Bank Account</option>
                        </select>

                    {errors.transferType && (
                        <p className="text-sm text-red-500">{errors.transferType.message}</p>
                    )}
                    </div>

                    <FormInput
                    name="destination_iban"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Destination IBAN"
                    error={errors.destination_iban}
                    />

                    <FormInput
                    name="amount"
                    type="number"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Amount"
                    error={errors.amount}
                    />

                    <Textarea
                    name="concept"
                    rows={3}
                    placeholder="Add a concept"
                    {...register("concept")}
                    />

                    <DialogFooter className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={close}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        {isSubmitting ? "Processing..." : "Confirm Transfer"}
                    </Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Transfer
