import React from 'react';
import { useUser } from '@user/context/UserContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';



const ForgotPassword = () => {

    const { t } = useTranslation();
    const forgotPasswordSchema = z.object({
        email: z.string().email(t('validation:email')),
    });

    const { forgotPassword } = useUser(); 
    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {  
        try {
            const response = await forgotPassword(data); 
            reset();
        } catch (error) {
            const { errors: responseErrors, message: generalMessage } = error.response?.data;

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">{ t('auth:forgot_password') }</h2>

                <div className="mb-4">
                    <FormInput
                        name="email"
                        type="email"
                        register={register}
                        disabled={isSubmitting}
                        placeholder={t('auth:email')}
                        error={errors.email}
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
                    >
                        {isSubmitting ? t('auth:loading') : t('auth:forgot_password') }
                        </Button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
