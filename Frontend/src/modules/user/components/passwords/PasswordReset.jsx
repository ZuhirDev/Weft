import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@user/context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const PasswordReset = () => {

    const { t } = useTranslation();
    const passwordResetSchema = z.object({
        token: z.string().min(1, t('validation:token')),
        email: z.string().email(t('validation:email')),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
    }).refine((data) => data.password === data.password_confirmation, {
        path:['password_confirmation'], message: t('validation:password.mismatch'),
    });
    
    const { passwordReset } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(passwordResetSchema),
    });

    const data = {
        token: params.get('token'),
        email: params.get('email'),
    }

    const onSubmit = async (data) => {

        try {
            await passwordReset(data);
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
                <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

                <div className="mb-4">
                    <FormInput
                        name="token"
                        type="text"
                        register={register}
                        disabled={isSubmitting}
                        hidden={true}
                        value={data.token}
                        placeholder="Token"
                        error={errors.token}
                    />
                </div>

                <div className="mb-4">
                    <FormInput
                        name="email"
                        type="email"
                        register={register}
                        disabled={true}
                        placeholder="Email"
                        value={data.email}
                        error={errors.email}
                    />
                </div>

                <div className="mb-4">
                    <FormInput
                        name="password"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder="Password"
                        error={errors.password}
                    />
                </div>

                <div className="mb-4">
                    <FormInput
                        name="password_confirmation"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder="Confirm password"
                        error={errors.password_confirmation}
                    />
                </div>

                {errors.root && (
                    <p className="text-sm text-red-500 m-2">{errors.root.message}</p>
                )}

                <div className="flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
                    >
                        {isSubmitting ? 'Loading' : 'Reset Password'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PasswordReset;
