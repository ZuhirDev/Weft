<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class AccountTransactionRequest extends FormRequest
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
            'destination_iban' => 'sometimes|string|different:iban|exists:accounts,iban',
            'external_iban' => 'sometimes|string|different:iban',
            'amount' => 'required|numeric|min:1',
            'concept' => 'nullable|string|max:255',
            'type' => 'required|in:deposit,withdraw,transfer',
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
