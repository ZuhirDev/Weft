import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, Unlock, Users, Calendar, ArrowUpRight, Landmark, CreditCardIcon, X, Copy, CheckCircle2 } from "lucide-react"
import { Link } from 'react-router-dom'

const AccountDetailPanel = ({ account, cards, transactions, onClose, onToggleBlock }) => {

    const [showTransactionsModal, setShowTransactionsModal] = useState(false) 
    const [copiedField, setCopiedField] = useState(null)
    const isBlocked = account.status === 'blocked';


    console.log("accountaaaa", account)
  
    const copyToClipboard = (text, field) => {
      navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }

    return (
        <div className="rounded-xl border bg-white shadow-sm">
          {/* Cabecera del panel */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Landmark className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium">{account.alias}</h2>
                  {isBlocked && (
                    <Badge variant="outline" className="border-gray-300 text-gray-500">
                      Bloqueada
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">Cuenta {account.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
    
          {/* Contenido del panel */}
          <div className="p-6">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              {/* Saldo */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">SALDO DISPONIBLE</p>
                <p className="text-2xl font-medium">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: 'EUR' }).format(
                    account.balance,
                  )}
                </p>
              </div>
    
              {/* Acciones */}
              <div className="flex flex-wrap gap-3">
                <Button className="flex-1" variant="outline" onClick={() => setShowTransactionsModal(true)}>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Ver Gastos
                </Button>
                <Button
                  className="flex-1"
                  variant={isBlocked ? "default" : "outline"}
                  onClick={() => onToggleBlock(account.iban, isBlocked ? 'active' : 'blocked')}
                >
                  {isBlocked ? (
                    <>
                      <Unlock className="mr-2 h-4 w-4" /> Desbloquear
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Bloquear
                    </>
                  )}
                </Button>
              </div>
            </div>
    
            {/* Tabs de información */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="holders">Titulares</TabsTrigger>
                <TabsTrigger value="cards">Tarjetas</TabsTrigger>
              </TabsList>
    
              <TabsContent value="details" className="mt-6 space-y-6">
                {/* Información bancaria */}
                <div className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-medium">Información Bancaria</h3>
    
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
                      <div>
                        <p className="text-xs text-gray-500">IBAN</p>
                        <p className="font-mono">{account.iban}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(account.iban.replace(/\s/g, ""), "iban")}
                      >
                        {copiedField === "iban" ? (
                          <CheckCircle2 className="h-4 w-4 text-black-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
    
                    <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
                      <div>
                        <p className="text-xs text-gray-500">SWIFT/BIC</p>
                        <p className="font-mono">{account.swift}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.swift, "swift")}>
                        {copiedField === "swift" ? (
                          <CheckCircle2 className="h-4 w-4 text-black-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
    
                {/* Fecha de apertura */}
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">FECHA DE APERTURA</p>
                    <p className="font-medium">
                      {new Date(account.open_date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </TabsContent>
    
              <TabsContent value="holders" className="mt-6">
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <h3 className="font-medium">Titulares de la Cuenta</h3>
                    </div>
                  </div>
    
                  <div className="divide-y">
                    {account.holders.map((holder, index) => (
                      <div key={index} className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <span className="text-lg font-medium">{holder.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{holder.name}</p>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className={
                                holder.role === "primary"
                                  ? "border-black bg-black text-white"
                                  : "border-gray-200 bg-gray-100"
                              }
                            >
                              {holder.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
    
              <TabsContent value="cards" className="mt-6">
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <h3 className="font-medium">Tarjetas Vinculadas</h3>
                    </div>
                  </div>
    
                  {/* {cards.length > 0 ? (
                    <div className="divide-y">
                      {cards.map((card) => (
                        <Link
                          key={card.id}
                          to="/cards"
                          className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-${card.color}`}>
                              <CreditCardIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                                {card.isisBlocked && " (Bloqueada)"}
                              </p>
                              <p className="text-sm text-gray-500">•••• {card.lastFourDigits}</p>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <CreditCard className="mb-2 h-8 w-8 text-gray-300" />
                      <p className="text-gray-500">No hay tarjetas asociadas a esta cuenta</p>
                      <Button variant="outline" className="mt-4">
                        Solicitar Tarjeta
                      </Button>
                    </div>
                  )} */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
    
          {/* Modal de transacciones */}
          {/* <TransactionsModal
            isOpen={showTransactionsModal}
            onClose={() => setShowTransactionsModal(false)}
            account={account}
            transactions={transactions}
          /> */}
        </div>
      )
}

export default AccountDetailPanel
