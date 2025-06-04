import React from 'react';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount } from '../context/AccountContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import VisibilityWrapper from '@/components/VisibilityWrapper';

const AccountDelete = ({ onSuccess }) => {
  const { selectedAccount, deleteAccount, refreshAccounts } = useAccount();

  const handleDelete = async () => {
    try {
      await deleteAccount({ iban: selectedAccount.iban });
      await refreshAccounts();
      onSuccess();
    } catch (error) {
      console.error('Error', error);
    }
  };

  if (!selectedAccount) return null;

  return (
    <Card className="w-full max-w-xl mx-auto border border-red-300 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-red-600">
          <TrashIcon className="w-5 h-5" />
          Delete Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          This action is irreversible. Make sure the balance is zero before continuing.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm space-y-1 bg-muted/40 p-4 rounded-lg border">
          <p>
            <span className="font-semibold">Alias:</span>{" "}
            {selectedAccount.alias || "No alias"}
          </p>
          <p>
            <span className="font-semibold">IBAN:</span> {selectedAccount.iban}
          </p>
          <p>
            <span className="font-semibold">Opened on:</span>{" "}
            {format(new Date(selectedAccount.open_date), "dd/MM/yyyy")}
          </p>
          <VisibilityWrapper>
            <p>
              <span className="font-semibold">Current Balance:</span> €
              {selectedAccount.balance.toFixed(2)}
            </p>
          </VisibilityWrapper>
        </div>

        {selectedAccount.balance > 0 && (
          <Alert variant="destructive">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This account still has a balance. Transfer the funds before deleting it.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleDelete}
          disabled={selectedAccount.balance > 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountDelete;
