import React, { useState } from "react"
import Transfer from '@/modules/transaction/components/Transfer'
import Withdrawal from '@/modules/transaction/components/Withdrawal'
import Deposit from '@transaction/components/Deposit'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AccountCreate from "@account/components/AccountCreate"
import AccountUpdate from "@account/components/AccountUpdate"
import AccountDelete from "@account/components/AccountDelete"
import useModal from "@/hooks/useModal"
import { useAccount } from "@account/context/AccountContext"
import { Skeleton } from "@/components/ui/skeleton"

const AccountAction = () => {
  const { isOpen, open, close } = useModal()
  const { selectedAccount } = useAccount();
  const [tab, setTab] = useState("update")

  return (
    <>
      {selectedAccount ? (
        <div className="relative group px-4 sm:px-6 lg:px-0 max-w-4xl mx-auto">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md pointer-events-none" />
          
          <div className="relative z-10 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-sm shadow-sm py-6 rounded-2xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <Deposit />
              <Withdrawal />
              <Transfer />
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center gap-1 rounded-xl border-yellow-400 text-yellow-600 hover:bg-yellow-50 transition text-xs sm:text-sm"
                onClick={open}
              >
                <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                  Account Actions
                </span>
              </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={close}>
              <DialogContent className="sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-8 py-6 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Account Actions
                  </DialogTitle>
                </DialogHeader>

                <Tabs
                  value={tab}
                  onValueChange={setTab}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <TabsList className="grid grid-cols-3 gap-2 mb-6 rounded-lg bg-muted p-1 w-full max-w-md">
                    <TabsTrigger value="update" className="rounded-lg text-xs sm:text-sm font-medium text-center">
                      Update
                    </TabsTrigger>
                    <TabsTrigger value="create" className="rounded-lg text-xs sm:text-sm font-medium text-center">
                      Create
                    </TabsTrigger>
                    <TabsTrigger value="delete" className="rounded-lg text-xs sm:text-sm font-medium text-center">
                      Delete
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="update" className="w-full max-w-md">
                    <AccountUpdate onSuccess={close} />
                  </TabsContent>
                  <TabsContent value="delete" className="w-full max-w-md">
                    <AccountDelete onSuccess={close} />
                  </TabsContent>
                  <TabsContent value="create" className="w-full max-w-md">
                    <AccountCreate onSuccess={close} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="relative group px-4 sm:px-6 lg:px-0 max-w-4xl mx-auto">
          <Skeleton className="absolute -inset-1 rounded-2xl" />
          <div className="relative z-10 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-sm shadow-sm py-6 rounded-2xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl border-yellow-400" />
            </div>
            <Skeleton className="h-6 max-w-xs rounded mx-auto" />
          </div>
        </div>
      )}
    </>
  )
}

export default AccountAction
