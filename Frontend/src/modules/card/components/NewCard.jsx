import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'
import { Plus, Sparkles } from 'lucide-react'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormInput from '@/components/FormInput'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCard } from '../context/CardContext'
import { useAccount } from '@/modules/account/context/AccountContext'


const NewCard = () => {

  const newCardSchema = z.object({
      iban: z.string().length(24),
      type: z.string().nonempty(),
      alias: z.string().nullable(),
  });

  const { handleSubmit, register, reset, setError, control,  formState: { errors, isSubmitting } } = useForm({
      resolver: zodResolver(newCardSchema),
  });

  const { isOpen, open, close } = useModal();
  const { accounts } = useAccount();
  const { createCard, types, getAllCards } = useCard();

  const onSubmit = async (data) => {

    try {
      const response  = await createCard(data);
      const updates = await getAllCards();
      close();
    } catch (error) {
      console.log("Erropr", error);
    }finally{
      reset();
    }
  }


  return (
    <>
    <div
      className=" cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      onClick={open}
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-30 blur-sm group-hover:opacity-100 group-hover:blur transition duration-1000 animate-gradient-x"></div>

      <div className="relative h-full flex flex-col items-center justify-center p-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-h-[280px]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-500">
            <Plus className="h-8 w-8 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Nueva Tarjeta
            </h3>
            <p className="text-white/60 text-sm max-w-[200px]">Solicita una nueva tarjeta quantum para tu cuenta</p>
          </div>

          <Button className="mt-4 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 hover:from-cyan-500/70 hover:to-purple-500/70 border-0 text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Solicitar
          </Button>
        </div>

        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-purple-400/50 rounded-bl-lg"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg"></div>
      </div>
    </div>

    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/5 opacity-10 rounded-lg -z-10" />

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Nueva Tarjeta
          </DialogTitle>
          <DialogDescription>Solicita una nueva tarjeta</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

      <select {...register("iban")} defaultValue="">
        <option value="" disabled>
          Select an account
        </option>
        {accounts.map(account => (
          <option key={account.iban} value={account.iban}>
            {account.alias}*{account.iban}
          </option>
        ))}
      </select>
                {errors.iban && (
                    <p className="text-red-500 text-xs mt-1">{errors.iban.message}</p>
                )}
      <select {...register("type")} defaultValue="">
        <option value="" disabled>
          Select card type
        </option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
                {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                )}
            <FormInput
                name="alias"
                type="text"
                register={register}
                disabled={isSubmitting}
                placeholder="alias"
                error={errors.alias}
            />

            <DialogFooter className="gap-2 sm:gap-0">
                <Button
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
                    {isSubmitting ? "Procesando..." : "Socicitar tarjeta"}
                </Button>
                    </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  
</>
)
}

export default NewCard
