<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserCustomerRequest extends FormRequest
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
            "email" => 'required|email|unique:users,email',
            "password" => 'required|string|min:8|confirmed',
            'name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,unspecified',
            'dni' => 'required|string|size:9|unique:customers,dni',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'avatar' => 'nullable|string',        
        ];
    }
}
