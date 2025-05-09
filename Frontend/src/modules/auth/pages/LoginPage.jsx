import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {

    
    const { t } = useTranslation();

    const loginSchema = z.object({
        email: z.string().email(t('validation:email')),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@admin.es',
            password: '11111111',
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            console.log("response login", response);
            reset();
            navigate('/dashboard');
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
                <h2 className="text-2xl font-semibold text-center mb-6">{t('auth:sign_in')}</h2>

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

                <div className="mb-4">
                    <FormInput
                        name="password"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder={t('auth:password')}
                        error={errors.password}
                    />
                </div>

                {errors.root && (
                    <p className="text-sm text-red-500 m-2">{errors.root.message}</p>
                )}

                <div className="flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full p-3 bg-primary text-white rounded-lg focus:outline-none"
                    >
                        {isSubmitting ? t('auth:loading') : t('auth:sign_in') }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;