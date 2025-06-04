import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'
import { CreditCardIcon, CreditCard } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import FormInput from '@/components/FormInput'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCard } from '../context/CardContext'
import { useAccount } from '@/modules/account/context/AccountContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const NewCard = () => {

  const newCardSchema = z.object({
      iban: z.string().length(24),
      type: z.enum(['credit', 'debit']),
      alias: z.string().min(3),
  });

  const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
      resolver: zodResolver(newCardSchema),
  });

  const { isOpen, open, close } = useModal();
  const { accounts } = useAccount();
  const { createCard, types, getAllCards } = useCard();

  const onSubmit = async (data) => {
    try {
      await createCard(data);
      await getAllCards();
      close();
      reset();
    } catch (error) {
      const { errors: responseErrors, message: generalMessage } = error.response?.data || {};

      if (responseErrors) {
        Object.keys(responseErrors).forEach((key) => {
          setError(key, { type: 'manual', message: responseErrors[key] });
        });
      }

      if (generalMessage) {
        setError('root', {
          type: 'manual',
          message: generalMessage,
        });
      }
    }
  }

return (
  <>
    <div
      onClick={open}
        className="w-80 h-48 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 shadow-md border border-border bg-white dark:bg-muted cursor-pointer hover:shadow-lg"    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
          <CreditCardIcon className="w-6 h-6" />
        </div>

        <div className=' '>
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            Order Your New Card
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Fast, secure, and accepted worldwide. 
          </p>
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation()
          open()
        }}
        className="w-full mt-4 bg-primary text-white text-sm font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors
          dark:bg-white dark:text-black dark:border dark:border-black"
      >
        Request Now
      </Button>
    </div>

    <Dialog open={isOpen} onOpenChange={close} className="relative z-50">
      <DialogContent className="sm:max-w-lg w-full rounded-2xl p-8 bg-card/95 backdrop-blur-lg border border-primary/20 shadow-lg dark:border-primary/40 dark:bg-muted-dark/80">
        <DialogHeader className="mb-6 flex items-center justify-between">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-primary">
            <CreditCard className="w-6 h-6" />
            Request a New Card
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-sm text-muted-foreground mb-6">
          Request your new card to access secure and payments worldwide.
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Select Account
            </label>
            <Controller
              name="iban"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50 focus:ring-2 focus:ring-primary focus:ring-offset-0">
                    <SelectValue placeholder="Choose an account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.iban} value={account.iban}>
                        {account.alias}* {account.iban}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.iban && <p className="mt-1 text-sm text-red-500">{errors.iban.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Card Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50 focus:ring-2 focus:ring-primary focus:ring-offset-0">
                    <SelectValue placeholder="Choose card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>}
          </div>

          <FormInput
            name="alias"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder="Card Alias"
            error={errors.alias}
            className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50 px-4 py-3 focus:ring-2 focus:ring-primary focus:ring-offset-0"
          />

          {errors.root && <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>}

          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-4">
            <Button
              variant="outline"
              onClick={close}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              variant="default"
              className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 w-full sm:w-auto dark:text-black"
              type="submit"
            >
              {isSubmitting ? "Processing..." : "Request Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </>
)

}

export default NewCard
