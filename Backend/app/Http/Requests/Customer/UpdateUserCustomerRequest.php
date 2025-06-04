<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [            
            'email' => 'sometimes|nullable|email|unique:users,email',            
            'name' => 'sometimes|nullable|string|max:100',
            'last_name' => 'sometimes|nullable|string|max:100',
            'dni' => 'sometimes|string|size:9|unique:customers,dni',
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|nullable|in:male,female,unspecified',
            'phone' => 'sometimes|nullable|string|max:15',
            'address' => 'sometimes|nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'avatar' => 'nullable|string',
        ];
    }
}
