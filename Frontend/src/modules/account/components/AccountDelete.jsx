import React from 'react';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '../context/AccountContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const AccountDelete = () => {
  const { selectedAccount, deleteAccount, refreshAccounts } = useAccount();

  const handleDelete = async () => {
    try {
      await deleteAccount({ iban: selectedAccount.iban });
      await refreshAccounts();
    } catch (error) {
      console.error('Error', error);
    }
  };

  if (!selectedAccount) return null;

  return (
    <Card className="w-full max-w-xl border-red-300 shadow-sm">
      <CardHeader>
        <CardTitle className="text-red-600 flex items-center gap-2">
          <TrashIcon className="w-5 h-5" />
          Eliminar Cuenta
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Esta acción no se puede deshacer. Asegúrate de que no haya saldo antes de continuar.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm space-y-1 bg-muted/40 p-3 rounded-md border">
          <p><span className="font-semibold">Alias:</span> {selectedAccount.alias || 'Sin alias'}</p>
          <p><span className="font-semibold">IBAN:</span> {selectedAccount.iban}</p>
          <p><span className="font-semibold">Fecha de apertura:</span> {format(new Date(selectedAccount.open_date), 'dd/MM/yyyy')}</p>
          <VisibilityWrapper>
            <p><span className="font-semibold">Saldo actual:</span> €{selectedAccount.balance.toFixed(2)}</p>
          </VisibilityWrapper>
        </div>

        {selectedAccount.balance > 0 && (
          <Alert variant="destructive">
            <AlertTitle>Atención</AlertTitle>
            <AlertDescription>
              Esta cuenta tiene saldo. Debes transferir el dinero antes de poder eliminarla.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleDelete}
          disabled={selectedAccount.balance > 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Eliminar Cuenta
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountDelete;
