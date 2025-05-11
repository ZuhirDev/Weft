<?php

namespace App\Http\Requests\Account;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'alias' => 'nullable|string|max:255',  
            'type' => 'required|in:checking,savings,investment', 
        ];
    }

    /**
     * Get the custom error messages for validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return trans('account/validationRequest');    
    }
}
