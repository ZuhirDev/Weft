import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@user/context/UserContext';
import { useTranslation } from 'react-i18next';


const UpdatePassword = () => {

    const { t } = useTranslation();

    const updatePasswordSchema = z.object({
        current_password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password: z.string().min(8, t('validation:password.min', { min: 8 })),
        password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
    }).refine((data) => data.password === data.password_confirmation, {
        path:['password_confirmation'], message: t('validation:password.mismatch'),
    });
    const { updatePassword } = useUser();
    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(updatePasswordSchema),
    });

    const onSubmit = async (data) => {

        try {
            const response = await updatePassword(data);
            reset();
        } catch (error) {
            // console.log("error en updatepassword", error.response?.data);
            const { errors: responseErrors, message: generalMessage } = error.response?.data;

            console.log("responseErrors", responseErrors, "*****", generalMessage);

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
                <h2 className="text-2xl font-semibold text-center mb-6">{ t('auth:update_password') }</h2>

                <div className="mb-4">
                    <FormInput
                        name="current_password"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder={t('auth:current_password')}
                        error={errors.current_password}
                    />
                </div>

                <div className="mb-4">
                    <FormInput
                        name="password"
                        type="password"
                        register={register}
                        disabled={isSubmitting}
                        placeholder={t('auth:new_password')}
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

                {errors.root && (
                    <p className="text-sm text-red-500 m-2">{errors.root.message}</p>
                )}

                <div className="flex justify-center">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
                    >
                        {isSubmitting ? t('auth:loading') : t('auth:update_password') }
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword;
