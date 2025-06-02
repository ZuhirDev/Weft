import { PlusCircle, CreditCard, TrendingUp, PiggyBank } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FormInput from "@/components/FormInput"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"

import { useAccount } from "../context/AccountContext"

const createAccountSchema = z.object({
  type: z.string().min(1, "Por favor selecciona un tipo de cuenta"),
  alias: z.string().min(3, "El alias debe tener al menos 3 caracteres"),
})

const AccountCreate = ({ onSuccess }) => {
  const { createAccount, refreshAccounts } = useAccount()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { type: "", alias: "" },
  })

  const accountTypes = [
    {
      id: "checking",
      name: "Cuenta Corriente",
      description: "Para gastos diarios y transacciones frecuentes",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      id: "savings",
      name: "Cuenta de Ahorros",
      description: "Para ahorrar dinero con intereses",
      icon: PiggyBank,
      color: "text-green-600",
    },
    {
      id: "investment",
      name: "Cuenta de Inversión",
      description: "Para invertir y hacer crecer tu dinero",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const onSubmit = async (data) => {
    try {
      await createAccount(data)
      await refreshAccounts()
      onSuccess?.()
      reset()
    } catch (error) {
      console.error("error", error)
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto border border-muted shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Crear Nueva Cuenta</CardTitle>
        </div>
      </CardHeader>

      {/* <Separator /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 py-4">
          <div>
            <FormInput
              name="alias"
              type="text"
              register={register}
              placeholder="Alias ..."
              disabled={isSubmitting}
              error={errors.alias}
            />
          </div>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <>
                <Label className="mb-2 block">Tipo de cuenta</Label>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-3">
                  {accountTypes.map((account) => {
                    const IconComponent = account.icon
                    return (
                      <div
                        key={account.id}
                        className="flex items-center space-x-3 cursor-pointer rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <RadioGroupItem value={account.id} id={account.id} className="mt-1" />
                        <Label htmlFor={account.id} className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-full bg-gray-100 ${account.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{account.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{account.description}</div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
                {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
              </>
            )}
          />
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Creando..." : "Crear Cuenta"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default AccountCreate
