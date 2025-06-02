import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import FormInput from '@/components/FormInput'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/modules/user/context/UserContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns'
import { DatePickerCustom } from '@/components/ui/DatePicker'


const RegisterPages = () => {

  const { t } = useTranslation();
  const registerSchema = z.object({
    email: z.string().email(t('validation:email')),
    password: z.string().min(8, t('validation:password.min', { min: 8 })),
    password_confirmation: z.string().min(8, t('validation:password.min', { min: 8 })),
    name: z.string().optional(),
    last_name: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
    dni: z.string().optional(),
    date_of_birth: z.date().nullable().optional(),
    gender: z.enum(['male', 'female', 'unspecified']).optional(),
    phone: z.string().max(15, t('validation:max_length', { max: 15 })).optional(),
    address: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
    occupation: z.string().max(100, t('validation:max_length', { max: 100 })).nullable().optional(),  
  }).refine((data) => data.password === data.password_confirmation, {
    path:['password_confirmation'], message: t('validation:password.mismatch'),
  });

  const [step, setStep] = useState(0)
  const totalSteps = 2; 

  const navigate = useNavigate();
  const { createCustomer } = useUser();
  const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit = async (formData) => {

    const payload ={
      ...formData,
      date_of_birth: formData?.date_of_birth ? format(formData?.date_of_birth, 'yyyy-MM-dd') : null,
    }

    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {

      try {
        const response = await createCustomer(payload);
        setStep(0);
        reset();
        navigate('/login');
      }catch (error) {

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
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="space-y-6 w-full max-w-2xl">
        <div className="flex items-center justify-center space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                  index <= step ? "bg-primary" : "bg-primary/30"
                )}
              />
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5",
                    index < step ? "bg-primary" : "bg-primary/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="shadow-lg border border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Multi Form</CardTitle>
            <CardDescription className="text-center">Current step {step + 1}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {step === 0 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">{t('auth:sign_up')}</h2>

                <FormInput
                  name="email"
                  type="email"
                  register={register}
                  disabled={isSubmitting}
                  placeholder={t('auth:email')}
                  error={errors.email}
                />

                <FormInput
                  name="password"
                  type="password"
                  register={register}
                  disabled={isSubmitting}
                  placeholder={t('auth:password')}
                  error={errors.password}
                />

                <FormInput
                  name="password_confirmation"
                  type="password"
                  register={register}
                  disabled={isSubmitting}
                  placeholder={t('auth:confirm_password')}
                  error={errors.password_confirmation}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    size="sm"
                    className="font-medium"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>

                  <Button type="submit" size="sm" className="font-medium">
                    {step === 2 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    name="name"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder={t('auth:name', 'Nombre')}
                    error={errors.name}
                  />

                  <FormInput
                    name="last_name"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder={t('auth:last_name', 'Apellido')}
                    error={errors.last_name}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    name="dni"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="DNI"
                    error={errors.dni}
                  />

                  <FormInput
                    name="phone"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder={t('auth:phone', 'Teléfono')}
                    error={errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('auth:date_of_birth', 'Date of Birth')}
                    </label>
                    <Controller
                      control={control}
                      name="date_of_birth"
                      render={({ field }) => (
                        <DatePickerCustom
                          message="Select your date of birth"
                          selectedDate={field.value}
                          setSelectedDate={field.onChange}
                        />
                      )}
                    />
                    {errors.date_of_birth && (
                      <p className="text-sm text-red-600 mt-1">{errors.date_of_birth.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unspecified">Unspecified</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    name="address"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder={t('user:address', 'Dirección')}
                    error={errors.address}
                  />

                  <FormInput
                    name="occupation"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder={t('user:occupation', 'Ocupación')}
                    error={errors.occupation}
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    size="sm"
                    className="font-medium"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>

                  <Button type="submit" size="sm" className="font-medium">
                    {step === 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPages
