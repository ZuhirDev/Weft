import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useTranslation } from 'react-i18next'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UploadCloud, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


/***
 * REVISAR LOS NULLLLLLSSSSS
 */

const UserUpdate = () => {

    const { t } = useTranslation();
    const { updateCustomer, user } = useUser();
    const userUpdateSchema = z.object({
        email: z.string().email(t('validation:email')).optional().or(z.literal('')),
        name: z.string().optional(),
        last_name: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
        gender: z.enum(['male', 'female', 'unspecified']).optional(),
        phone: z.string().max(15, t('validation:max_length', { max: 15 })).optional(),
        address: z.string().max(100, t('validation:max_length', { max: 100 })).optional(),
        occupation: z.string().max(100, t('validation:max_length', { max: 100 })).nullable().optional(),
    });

    const { handleSubmit, register, reset, setError, control, formState: { errors, isSubmitting, dirtyFields } } = useForm({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            email:  user.email || '',
            name:  user.name || '',
            last_name:  user.last_name || '',
            gender:  user.gender || '',
            phone:  user.phone || '',
            address:  user.address || '',
            occupation:  user.occupation || '',
            avatar:  user.avatar || '',            
        }
    });

    const onSubmit = async (data) => { console.log("Data", data)

        const changedFields = {};

        Object.keys(dirtyFields).forEach(field => {
            changedFields[field] = data[field];
        });

        console.log("aaaaaa", changedFields)

        try {
            const response = await updateCustomer(changedFields);
            console.log("response", response)
            reset();
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
     <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          Acualizar perfil
        </h1>

        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://i.pravatar.cc/150?img=3" />
            <AvatarFallback className="text-4xl bg-gray-200 text-gray-500">U</AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline" className="flex items-center gap-2" disabled>
            <UploadCloud className="w-5 h-5" />
            cambiar foto
          </Button>
        </div>

        <div>
          <FormInput
            name="email"
            type="email"
            register={register}
            disabled={isSubmitting}
            placeholder={t('auth:email', 'Correo electrónico')}
            error={errors.email}
          />
        </div>

        <div>
          <FormInput
            name="name"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('auth:name', 'Nombre')}
            error={errors.name}
          />
        </div>

        <div>
          <FormInput
            name="last_name"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('auth:last_name', 'Apellido')}
            error={errors.last_name}
          />
        </div>

        <div>
          {/* <FormInput
            name="gender"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('user:gender', 'Género (male, female, unspecified)')}
            error={errors.gender}
          /> */}

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">female</SelectItem>
                  <SelectItem value="unspecified">unspecified</SelectItem>
                </SelectContent>
              </Select>
              </>
            )}
          />

          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            name="phone"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('auth:phone', 'Teléfono')}
            error={errors.phone}
          />
        </div>

        <div>
          <FormInput
            name="address"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('user:address', 'Dirección')}
            error={errors.address}
          />
        </div>

        <div>
          <FormInput
            name="occupation"
            type="text"
            register={register}
            disabled={isSubmitting}
            placeholder={t('user:occupation', 'Ocupación')}
            error={errors.occupation}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            disabled={isSubmitting}
            variant="default"
            className="px-6"
          >
            {isSubmitting ? t('auth:loading') : 'actualizar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdate
