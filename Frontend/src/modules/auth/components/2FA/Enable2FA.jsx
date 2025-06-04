import React, { useState } from 'react';
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@auth/context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import PasswordVerification from '../PasswordVerification';
import useModal from '@/hooks/useModal';

const Enable2FA = () => {

    const { t } = useTranslation();
    const { isOpen, open, close } = useModal();
    const { enable2FA, setNeeds2FA } = useAuth();
    const [qrCodeURL, setQrCodeURL] = useState(null);
    const [secret, setSecret] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const copyToClipboard = async (secret) => {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleEnable2FA = async () => {
        try {
            close();
            const response = await enable2FA();
            
            setQrCodeURL(response.qr_url);
            setSecret(response.secret);
            setIsEnabled(true); 
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleClose = () => {
        setNeeds2FA(true);
        sessionStorage.setItem('needs_2fa', 'true');
        setIsEnabled(false); 
    };

    return (
        <>

            <Button onClick={open} variant="outline">
                Enable 2FA                    
            </Button>

            <Dialog open={isEnabled}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Enable Verification 2FA</DialogTitle>
                        <DialogDescription>
                            Scan or copy this code to enable it
                        </DialogDescription>
                    </DialogHeader>

                    {isEnabled ? (
                        <div>
                            <div className="flex justify-center items-center p-4 rounded-lg">
                                {qrCodeURL && <QRCodeSVG value={qrCodeURL} size={256} />}
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            value={secret}
                                            readOnly
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => copyToClipboard(secret, 'secret')}
                                        className="rounded hover:bg-muted"
                                    >
                                        {copied ? (
                                        <Check className="" size={18} />
                                        ) : (
                                        <Copy className="text-muted-foreground hover:text-foreground" size={18} />
                                        )}
                                    </Button>                                    
 
                                </div>
                            </div>

                            <DialogFooter className="sm:justify-start mt-4">
                                <DialogClose asChild>
                                    <Button onClick={handleClose} type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Skeleton className="w-64 h-64 rounded-md mx-auto" />
                    
                            <Skeleton className="h-10 w-full rounded-md" />
                    
                            <div className="flex justify-start">
                                <Skeleton className="h-10 w-20 rounded-md" />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <PasswordVerification 
                isOpen={isOpen}
                onClose={close}
                onVerify={handleEnable2FA}
            />
        </>
    );
};

export default Enable2FA;
