import React, { useState } from 'react';
import { Copy, Check, Building2, MapPin, Users, CreditCard, Building, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAccount } from '@account/context/AccountContext';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const AccountDetails = () => {
  const [copiedField, setCopiedField] = useState(null);
  const { selectedAccount } = useAccount();

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const DetailRow = ({ label, value, field, icon: Icon }) => (
    <div className="group relative rounded-xl overflow-hidden">
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-xs sm:text-sm text-muted-foreground">{label}</Label>
          <p className="mt-0.5 truncate text-sm sm:text-sm font-medium">{value}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(value, field)}
          className="relative shrink-0 h-8 w-8 rounded-lg transition-colors hover:bg-primary/10"
        >
          {copiedField === field ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative group px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
      {selectedAccount ? (
        <>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md" />
          <Card className="relative border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute top-0 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

            <CardHeader className="relative z-10 pb-0">
              <CardTitle className="text-lg sm:text-xl font-bold">Account Details</CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-3 pt-5">
              <DetailRow
                label="Primary Account Holder"
                value={selectedAccount.holders.find(holder => holder.role === 'primary')?.name}
                field="primary-holder"
                icon={Users}
              />
              {selectedAccount.holders.length > 1 && (
                <DetailRow
                  label="Secondary Account Holder"
                  value={selectedAccount.holders.find(holder => holder.role === 'secondary')?.name}
                  field="secondary-holder"
                  icon={Users}
                />
              )}
              <DetailRow label="IBAN" value={selectedAccount.iban} field="iban" icon={CreditCard} />
              <DetailRow label="SWIFT/BIC" value={selectedAccount.swift} field="swift" icon={Wallet} />
              <DetailRow
                label="Opening Date"
                value={format(new Date(selectedAccount.open_date), 'dd/MM/yyyy')}
                field="open"
                icon={Wallet}
              />
              <DetailRow label="Bank Name" value="Weft" field="bank" icon={Building} />
              <DetailRow label="Bank Address" value="Albondon 15" field="address" icon={MapPin} />

              <Alert className="mt-6 bg-primary/5 border border-primary/10 text-foreground flex flex-col sm:flex-row items-start sm:items-center gap-2 px-3 py-2">
                <Building2 className="h-4 w-4 text-primary shrink-0" />
                <AlertDescription className="text-xs sm:text-sm leading-snug">
                  Use these details for international transfers. Always verify information before transferring.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="w-full max-w-4xl mx-auto space-y-3">
          <div className="h-9 w-32 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50 rounded-lg mb-3">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50"
            >
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-1/3 rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              <Skeleton className="h-7 w-7 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
