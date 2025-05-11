<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class PaymentCardRequest extends FormRequest
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
            'card_number' => 'required|string|size:16|regex:/^\d+$/',
            'amount' => 'required|numeric|min:0.01',
            'concept' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get the custom error messages for validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return trans('transaction/validationRequest');    
    }
}
