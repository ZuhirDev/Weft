import React from 'react';

import { Landmark, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";


const AccountCard = ({ account, isSelected, onClick }) => {
    const isBlocked = account.status === 'blocked';
    return (
        <div
        className={cn(
            "relative cursor-pointer overflow-hidden rounded-xl border transition-all hover:shadow-md",
            isSelected ? "ring-2 ring-black" : "",
            isBlocked ? "opacity-80" : "",
        )}
        onClick={onClick}
        >
            <div className="bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {isBlocked ? (
                        <Lock className="h-5 w-5 text-gray-500" />
                    ) : (
                        <Landmark className="h-5 w-5 text-gray-500" />
                    )}
                    </div>
                    <div>
                    <h3 className="font-medium">{account.alias}</h3>
                    <p className="text-sm text-gray-500">Cuenta {account.type}</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="space-y-3">
                <div>
                    <p className="text-xs text-gray-500">SALDO DISPONIBLE</p>
                    <p className="text-xl font-medium">
                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: 'EUR' }).format(
                        account.balance,
                    )}
                    </p>
                </div>

                <div className="flex justify-between text-sm">
                    <div>
                    <p className="text-gray-500">IBAN</p>
                    <p className="font-mono">
                        {account.iban.substring(0, 4)}...{account.iban.substring(account.iban.length - 4)}
                    </p>
                    </div>
                    <div className="text-right">
                    <p className="text-gray-500">TITULARES</p>
                    <p>{account.holders.length}</p>
                    </div>
                </div>
                </div>
            </div>

            {isBlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm font-medium">BLOQUEADA</span>
                </div>
                </div>
            )}
        </div>
    )
}

export default AccountCard
