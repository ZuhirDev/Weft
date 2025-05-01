import React, { useState } from 'react';
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@auth/context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';

const Enable2FA = () => {

    const { t } = useTranslation();
    const { enable2FA, setNeeds2FA } = useAuth();
    const [qrCodeURL, setQrCodeURL] = useState(null);
    const [secret, setSecret] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(secret);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Error al copiar el enlace:", err);
        }
    };

    const handleEnable2FA = async () => {
        try {
            const response = await enable2FA();
            console.log("response en enablepage", response);
            
            setQrCodeURL(response.qr_url);
            setSecret(response.secret);
            setIsEnabled(true); 
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleClose = () => {
        setNeeds2FA(true);
        sessionStorage.setItem('2fa_enabled', true);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={handleEnable2FA} variant="outline">
                        {t('auth:enable_2fa')}                    
                    </Button>
                </DialogTrigger>

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
                                    <Button type="button" onClick={handleCopy} size="sm" className="px-3">
                                        <span className="sr-only">Copy</span>
                                        <Copy />
                                    </Button>
                                </div>
                                <div className='mt-4'> 

                                {copied && <span className="text-sm text-black-900 ">¡Copiado!</span>}
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
        </>
    );
};

export default Enable2FA;
