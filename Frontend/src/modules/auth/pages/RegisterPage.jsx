import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import FormInput from '@/components/FormInput'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@/modules/user/context/UserContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns'
import { DatePickerCustom } from '@/components/ui/DatePicker'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import AUTH_ROUTES from '@auth/routes/paths'


const RegisterPage = () => {

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
  <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
    <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

    <div className="w-full max-w-2xl px-6 md:px-8">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "h-3 w-3 rounded-full transition-all duration-300",
                  index <= step ? "bg-primary" : "bg-primary/20"
                )}
              />
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 transition-all duration-300",
                    index < step ? "bg-primary" : "bg-primary/20"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="border border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-card-dark/95 dark:border-primary/20">
        <CardContent className="p-8 md:p-12">
          <div className="mb-4 self-start">
            <Link
              to={AUTH_ROUTES.HOME}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors dark:text-muted-foreground-dark dark:hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 text-center mb-8 px-4 md:px-0">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">
              Create your account
            </CardTitle>
            <CardDescription className="dark:text-muted-foreground-dark max-w-lg text-sm md:text-base">
              Set up your account now to explore personalized features, stay secure, and manage everything with ease.
            </CardDescription>
          </div>

          {step === 0 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="dark:text-white">Email</Label>
                  <FormInput
                    name="email"
                    type="email"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your email"
                    error={errors.email}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="dark:text-white">Password</Label>
                  <FormInput
                    name="password"
                    type="password"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Create a password"
                    error={errors.password}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation" className="dark:text-white">Confirm Password</Label>
                  <FormInput
                    name="password_confirmation"
                    type="password"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Confirm your password"
                    error={errors.password_confirmation}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="rounded-lg"
                >
                  Back
                </Button>
                <Button type="submit" className="rounded-lg">
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="dark:text-white">First Name</Label>
                  <FormInput
                    name="name"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your first name"
                    error={errors.name}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="last_name" className="dark:text-white">Last Name</Label>
                  <FormInput
                    name="last_name"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your last name"
                    error={errors.last_name}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dni" className="dark:text-white">DNI</Label>
                  <FormInput
                    name="dni"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your DNI"
                    error={errors.dni}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="dark:text-white">Phone</Label>
                  <FormInput
                    name="phone"
                    type="tel"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your phone number"
                    error={errors.phone}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date_of_birth" className="dark:text-white">Date of Birth</Label>
                  <Controller
                    control={control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <DatePickerCustom
                        message="Select your date of birth"
                        selectedDate={field.value}
                        setSelectedDate={field.onChange}
                        className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                      />
                    )}
                  />
                  {errors.date_of_birth && (
                    <p className="text-sm text-red-500 mt-1">{errors.date_of_birth.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gender" className="dark:text-white">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="rounded-lg bg-muted/50 dark:bg-muted-dark/50">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="unspecified">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address" className="dark:text-white">Address</Label>
                  <FormInput
                    name="address"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your address"
                    error={errors.address}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="occupation" className="dark:text-white">Occupation</Label>
                  <FormInput
                    name="occupation"
                    type="text"
                    register={register}
                    disabled={isSubmitting}
                    placeholder="Enter your occupation"
                    error={errors.occupation}
                    className="rounded-lg bg-muted/50 dark:bg-muted-dark/50"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-lg"
                >
                  Back
                </Button>
                <Button type="submit" size="sm" className="font-medium">
                  {step === 1 ? "Submit" : "Next"}
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

export default RegisterPage;
