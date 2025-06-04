import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Pencil, Loader2 } from "lucide-react"
import { useAccount } from "../context/AccountContext"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

const updateAccountSchema = z.object({
  alias: z.string().max(100).nullable().optional(),
  status: z.enum(["active", "blocked"]).optional(),
})

const AccountUpdate = ({ onSuccess }) => {
  const { selectedAccount, updateAccount, refreshAccounts } = useAccount()

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(updateAccountSchema),
  })

  const onSubmit = async (data) => {
    const datas = {
      ...data,
      iban: selectedAccount.iban,
    }

    try {
      await updateAccount(datas)
      await refreshAccounts(selectedAccount.id)
      onSuccess();
    } catch (error) {
      console.error("Error", error)
    } finally {
      reset()
    }
  }

  useEffect(() => {
    reset()
  }, [selectedAccount])

  return (
  <Card className="w-full max-w-xl mx-auto border border-muted shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Pencil className="w-5 h-5 text-yellow-500" />
          <CardTitle className="text-lg font-semibold">Update Account</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          You can modify the account alias or change its status.
        </p>        
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="alias">Alias</Label>
            <Input
              id="alias"
              type="text"
              placeholder="Enter account alias"
              {...register("alias")}
              disabled={isSubmitting}
            />
            {errors.alias && (
              <p className="text-sm text-red-500">{errors.alias.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="statusSwitch">Account Status</Label>
            <div className="flex items-center gap-4">
              <Controller
                name="status"
                control={control}
                defaultValue={selectedAccount?.status}
                render={({ field }) => {
                  const isBlocked = field.value === "blocked"

                  return (
                    <>
                      <Switch
                        id="statusSwitch"
                        checked={isBlocked}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "blocked" : "active")
                        }
                        disabled={isSubmitting}
                      />
                      <span
                        className={`text-xs font-semibold tracking-wide uppercase ${
                          isBlocked ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {isBlocked ? "Blocked" : "Active"}
                      </span>
                    </>
                  )
                }}
              />
            </div>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Update Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default AccountUpdate
