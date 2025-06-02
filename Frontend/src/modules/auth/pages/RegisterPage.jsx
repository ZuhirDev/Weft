import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useAuth } from '@auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AUTH_ROUTES from '@auth/routes/paths';
import { useTranslation } from 'react-i18next';

/** VERIFICAR LA PASSOWRD CONFIRMATION  */

const RegisterPage = () => {

    const { t } = useTranslation();
    const registerSchema = z.object({
        email: z.string().email(t('validation:email')),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
        
    }).refine((data) => data.password === data.password_confirmation, {
        path:['password_confirmation'], message: t('validation:password.mismatch'),
    });
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            console.log("response", response)
            reset();
            navigate(AUTH_ROUTES.LOGIN);
        } catch (error) {
            console.log("error register", error);
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
                <h2 className="text-2xl font-semibold text-center mb-6">{ t('auth:sign_up') }</h2>

                {/* <div className="mb-4">
                    <FormInput
                        name="name"
                        type="text"
                        register={register}
                        disabled={isSubmitting}
                        placeholder="Name"
                        error={errors.name}
                    />
                </div> */}

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

                <div className="mb-4">
                    <FormInput
                        name="password_confirmation"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder={t('auth:confirm_password')}
                        error={errors.password_confirmation}
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full p-3 bg-primary text-white rounded-lg focus:outline-none"
                    >
                        {isSubmitting ? t('auth:loading') : t('auth:sign_up') }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
