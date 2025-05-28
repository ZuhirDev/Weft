import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import FormInput from '@/components/FormInput';
import { useAuth } from '@auth/context/AuthContext';


const PasswordVerification = ({ isOpen, onClose, onVerify }) => {
    
    const { t } = useTranslation();
    const PasswordVerificationSchema = z.object({
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
    });

    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(PasswordVerificationSchema),
    });

    const { passwordVerification } = useAuth();

    const handleClose = () => onClose();

    const onSubmit = async (data) => {

        try {
            const response = await passwordVerification(data);
            reset();
            onVerify();
        } catch (error) {

            const { errors: responseErrors, message: generalMessage } = error?.response?.data;

            if(responseErrors) {
                Object.keys(responseErrors).forEach((key) => {
                    setError(key, { type: 'manual', message: responseErrors[key] });
                });
            }

            if (generalMessage) {
                setError('root', {
                    type: 'manual',
                    message: generalMessage, 
                });
            }
        }
    }

    return(
        <>

            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Verificación de Seguridad
                        </DialogTitle>
                    </DialogHeader>
            
                    <DialogDescription>
                        Por favor, introduce tu contraseña para acceder a la información confidencial.
                    </DialogDescription>


                    <form onSubmit={handleSubmit(onSubmit)} className='py-2' >
                        <FormInput
                            name="password"
                            type="password"
                            register={register}
                            disabled={isSubmitting}
                            placeholder={t('auth:password')}
                            error={errors.password}
                        />

                        {errors.root && (
                            <p className="text-sm text-red-500 m-2">{errors.root.message}</p>
                        )}

                        <div className="flex justify-center pt-4">
                            <Button
                                disabled={isSubmitting}
                                variant="outline"
                                className="w-full p-3 bg-primary text-white rounded-lg focus:outline-none"
                            >
                                {isSubmitting ? t('auth:loading') : 'Verificar' }
                            </Button>
                        </div>
                    </form>
                            
                </DialogContent>
            </Dialog>

        </>
    );
}

export default PasswordVerification;
