import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { DateInput } from '@/components/ui/DateInput';


const UserUpdate = () => {

    const { t } = useTranslation();
    const { updateCustomer } = useAuth();
    const { user } = useAuth();
    const userUpdateSchema = z.object({
      email: z.string().email(t('validation:email')),
      name: z.string().optional(),
      last_name: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
      dni: z.string().optional(),
      date_of_birth: z.string().nullable().optional(),
      gender: z.enum(['male', 'female', 'unspecified']).optional(),
      phone: z.string().max(15, t('validation:max_length', { max: 15 })).optional(),
      address: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
      occupation: z.string().max(100, t('validation:max_length', { max: 100 })).nullable().optional(),
      avatar: z.string().url().optional(),
    });

    if(!user) return;

    const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting, dirtyFields } } = useForm({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            email:  user.email || '',
            name:  user.name || '',
            last_name:  user.last_name || '',
            dni:  user.dni || '',
            date_of_birth: user.date_of_birth,
            gender:  user.gender || '',
            phone:  user.phone || '',
            address:  user.address || '',
            occupation:  user.occupation || '',
        }
    });

    const onSubmit = async (data) => {

      console.log(data)
        const changedFields = {};

        Object.keys(dirtyFields).forEach(field => {
            changedFields[field] = data[field];
        });

        try {
            const response = await updateCustomer(changedFields);
            toast.success(response?.message);

            reset({
              email: response.user.email || '',
              name: response.user.name || '',
              last_name: response.user.last_name || '',
              dni: response.user.dni || '',
              gender: response.user.gender || '',
              phone: response.user.phone || '',
              address: response.user.address || '',
              occupation: response.user.occupation || '',
              date_of_birth: response.user.date_of_birth,
            });

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b pb-6 mb-8">
        <h2 className="text-xl font-semibold text-foreground">Update Information</h2>
        <p className="text-sm text-muted-foreground">
          Keep your profile up to date to ensure accurate information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">First Name</Label>
            <FormInput
              name="name"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your first name"
              error={errors.name}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="last_name" className="text-sm font-medium text-foreground">Last Name</Label>
            <FormInput
              name="last_name"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your last name"
              error={errors.last_name}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="dni" className="text-sm font-medium text-foreground">DNI</Label>
            <FormInput
              name="dni"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your DNI"
              error={errors.dni}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
            <FormInput
              name="phone"
              type="tel"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your phone number"
              error={errors.phone}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

          <div>
            <DateInput
              register={register}
              name="date_of_birth"
              label="Select your date of birth"
              error={errors.date_of_birth}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="gender" className="text-sm font-medium text-foreground">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50">
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

          <div className="space-y-1">
            <Label htmlFor="address" className="text-sm font-medium text-foreground">Address</Label>
            <FormInput
              name="address"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your address"
              error={errors.address}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="occupation" className="text-sm font-medium text-foreground">Occupation</Label>
            <FormInput
              name="occupation"
              type="text"
              register={register}
              disabled={isSubmitting}
              placeholder="Enter your occupation"
              error={errors.occupation}
              className="w-full rounded-lg bg-muted/50 dark:bg-muted-dark/50"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdate
