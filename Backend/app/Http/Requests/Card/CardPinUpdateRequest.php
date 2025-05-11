<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;

class CardPinUpdateRequest extends FormRequest
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
            'new_pin' => 'required|digits:4',
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
