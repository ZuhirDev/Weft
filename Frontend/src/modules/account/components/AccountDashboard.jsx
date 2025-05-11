import React, { useState } from 'react'
import { useAccount } from '@account/context/AccountContext';
import { useLoading } from '@/context/LoadingContext';
import { Skeleton } from '@/components/ui/skeleton';
import AccountCard from './AccountCard';
import AccountDetailPanel from './AccountDetailPanel';

const AccountDashboard = () => {

  const { isLoading, showLoading, hideLoading } = useLoading();
  const { accounts, updateAccount } = useAccount();
  const [selectedAccountId, setSelectedAccountId] = useState(null);


  console.log("acccount dash", selectedAccountId)  

  const selectedAccount = selectedAccountId ? accounts.find((account) => account.id === selectedAccountId) : null


  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0)

  const toggleAccountBlock = async (iban, newStatus) => {

    try { // actualizar correctamente
      const response = await updateAccount({iban, status: newStatus})
      console.log("response", response)
    } catch (error) {
      console.log("Error", error)
    }
  };

  return (
    <div className="space-y-8">
      {/* Resumen de cuentas */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-medium">Resumen de Cuentas</h2>
            <p className="text-sm text-gray-500">Saldo total en todas tus cuentas</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-6 py-3">
            <p className="text-sm text-gray-500">SALDO TOTAL</p>
            <p className="text-2xl font-medium">
              {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalBalance)}
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              isSelected={selectedAccountId === account.id}
              onClick={() => setSelectedAccountId(account.id === selectedAccountId ? null : account.id)}
            />
          ))}
        </div>
      </div>

      {selectedAccount && (
        <AccountDetailPanel
          account={selectedAccount}
          // cards={accountCards}
          // transactions={accountTransactions}
          onClose={() => setSelectedAccountId(null)}
          onToggleBlock={toggleAccountBlock}
        />
      )}
    </div>
  );
}

export default AccountDashboard
