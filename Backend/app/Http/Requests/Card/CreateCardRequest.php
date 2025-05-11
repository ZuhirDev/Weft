<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;

class CreateCardRequest extends FormRequest
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
            'iban' => 'required|string|exists:accounts,iban',
            'alias' => 'sometimes|string|max:255',
            'type' => 'required|in:debit,credit',
        ];
    }

    /**
     * Get the custom error messages for validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return trans('card/validationRequest');    
    }  
}
