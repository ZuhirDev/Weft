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
            className="h-20 w-full flex flex-col items-center justify-center gap-1 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition"
            >
            <Download className="h-5 w-5 text-green-500" />
            <span>Deposit</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-xl max-w-full bg-white dark:bg-zinc-900 border border-muted dark:border-zinc-700 rounded-lg shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/10 dark:to-muted/20 opacity-10 rounded-lg -z-10" />

                <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    <Download className="h-5 w-5 text-green-500" />
                    Make a Deposit
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                    Add funds to your account.
                </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="amount" className="text-zinc-900 dark:text-zinc-100">
                    Amount
                    </Label>
                    <FormInput
                    id="amount"
                    name="amount"
                    type="number"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter amount"
                    error={errors.amount}
                    />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="concept" className="text-zinc-900 dark:text-zinc-100">
                    Concept
                    </Label>
                    <Textarea
                    id="concept"
                    name="concept"
                    rows={3}
                    placeholder="Add a concept or note"
                    {...register("concept")}
                    className="w-full border rounded px-3 py-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

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
                    className="bg-green-500 hover:bg-green-600 text-white"
                    >
                    {isSubmitting ? "Processing..." : "Confirm Deposit"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
        </>
    )

    
}

export default Deposit
