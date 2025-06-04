import { PlusCircle, CreditCard, TrendingUp, PiggyBank } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FormInput from "@/components/FormInput"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useAccount } from "@account/context/AccountContext"

const createAccountSchema = z.object({
  type: z.string().min(1, "Por favor selecciona un tipo de cuenta"),
  alias: z.string().min(3, "El alias debe tener al menos 3 caracteres"),
})

const AccountCreate = ({ onSuccess}) => {
  const { createAccount, refreshAccounts } = useAccount();
  const { handleSubmit, register, control, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { type: "", alias: "" },
  });

  const accountTypes = [
    {
      id: "checking",
      name: "Checking Account",
      description: "For daily expenses and frequent transactions",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      id: "savings",
      name: "Savings Account",
      description: "For saving money with interest",
      icon: PiggyBank,
      color: "text-green-600",
    },
    {
      id: "investment",
      name: "Investment Account",
      description: "For investing and growing your money",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];


  const onSubmit = async (data) => {
    try {
      await createAccount(data);
      await refreshAccounts();
      onSuccess();
      reset();
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto border border-muted shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg">Create New Account</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose a type and give your new account a custom alias.
        </p>        
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="py-4 space-y-6">
          <FormInput
            name="alias"
            type="text"
            register={register}
            placeholder="Enter an alias..."
            disabled={isSubmitting}
            error={errors.alias}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <>
                <Label className="block mb-2 text-zinc-900 dark:text-zinc-100">
                  Account Type
                </Label>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  {accountTypes.map((account) => {
                    const IconComponent = account.icon
                    return (
                      <div
                        key={account.id}
                        className="flex items-center p-3 space-x-3 rounded-lg cursor-pointer
                          hover:bg-zinc-50 dark:hover:bg-zinc-700
                          transition-colors"
                      >
                        <RadioGroupItem
                          value={account.id}
                          id={account.id}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={account.id}
                          className="flex flex-1 items-start space-x-3 text-zinc-900 dark:text-zinc-100"
                        >
                          <div
                            className={`p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 ${account.color}`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{account.name}</div>
                            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                              {account.description}
                            </div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
                )}
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
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default AccountCreate
