import Transfer from '@/modules/transaction/components/Transfer'
import Withdrawal from '@/modules/transaction/components/Withdrawal'
import Deposit from '@transaction/components/Deposit'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PlusCircle } from "lucide-react"
import AccountCreate from "./AccountCreate"
import AccountUpdate from "./AccountUpdate"
import AccountDelete from "./AccountDelete"

const AccountAction = () => {

  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("update")
  
  return (
    <div>
      <Deposit />
      <Withdrawal />
      <Transfer />

      <Button
        variant="outline"
        className="w-full h-20 flex flex-col items-center justify-center gap-1"
        onClick={() => setOpen(true)}
      >
        <PlusCircle className="h-6 w-6 text-yellow-500" />
        <span className="text-sm font-medium">Acciones de Cuenta</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-2xl h-[800px] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Acciones sobre la cuenta</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="update">Actualizar</TabsTrigger>
              <TabsTrigger value="create">Crear</TabsTrigger>
              <TabsTrigger value="delete">Eliminar</TabsTrigger>
            </TabsList>

            <TabsContent value="update" className="h-full">
              <AccountUpdate onSuccess={() => setOpen(false)} />
            </TabsContent>
            <TabsContent value="delete" className="h-full">
              <AccountDelete onSuccess={() => setOpen(false)} />
            </TabsContent>
            <TabsContent value="create" className="h-full">
              <AccountCreate onSuccess={() => setOpen(false)} />
            </TabsContent>          
          </Tabs>
        </DialogContent>
      </Dialog>    
      
      </div>
  )
}

export default AccountAction
