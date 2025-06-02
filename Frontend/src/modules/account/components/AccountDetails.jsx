import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAccount } from '@account/context/AccountContext';

const AccountDetails = () => {

    const [copiedField, setCopiedField] = useState(null);

    const { selectedAccount } = useAccount();
    
    
    if(!selectedAccount) return <div>cargando...</div>
    
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const DetailRow = ({ label, value, field }) => (
        <div className="flex justify-between items-start py-4 border-b border-muted last:border-0">
        <div>
            <Label className="text-sm text-muted-foreground">{label}</Label>
            <p className="text-sm text-foreground mt-1">{value}</p>
        </div>
        <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(value, field)}
            className="rounded hover:bg-muted"
        >
            {copiedField === field ? (
            <Check className="text-emerald-500" size={18} />
            ) : (
            <Copy className="text-muted-foreground hover:text-foreground" size={18} />
            )}
        </Button>
        </div>
    );

    return (
        <Card
        className="bg-gradient-to-br from-green-300 via-teal-400 to-teal-500 text-white rounded-3xl"
        >
        <CardHeader>
            <CardTitle className="text-xl">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <DetailRow label="Account Holder" value={selectedAccount.holders.find(holder => holder.role === 'primary')?.name} field="primary-holder" /> 
            { selectedAccount?.holders.length > 1 && <DetailRow label="Account cotitular" value={selectedAccount.holders.find(holder => holder.role === 'secondary')?.name} field="secondary-holder" /> }
            <DetailRow label="IBAN" value={selectedAccount.iban} field="iban" />
            <DetailRow label="SWIFT/BIC" value={selectedAccount.swift} field="swift" />
            <DetailRow label="Bank Name" value={'Weft'} field="bank" />
            <DetailRow label="Bank Address" value={'Albondon 15'} field="address" />

            <Alert className="mt-6 bg-muted text-muted-foreground">
            <AlertDescription>
                Use these details for international transfers. Always verify the information before making a transfer.
            </AlertDescription>
            </Alert>
        </CardContent>
        </Card>
    );
}

export default AccountDetails
