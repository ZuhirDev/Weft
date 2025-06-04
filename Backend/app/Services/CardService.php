<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Card;
use Faker\Factory as Faker;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Crypt;

class CardService{

    public function getCardsByAccount(string $iban)
    {
        return Card::whereHas('account', function ($query) use ($iban) {
            $query->where('iban', $iban);
        })->get();
    }

    public function getCardsByCustomerId(int $customerId)
    {
        return Card::whereHas('account.customers', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })->get();
    }

    public function getCardByAccount(string $iban)
    {
        return Card::whereHas('account', function ($query) use ($iban) {
            $query->where('iban', $iban);
        })->first();
    }

    public function getCardByNumber(string $cardNumber)
    {
        return Card::where('card_number', $cardNumber)->first();
    }

    public function getPinCard(Card $card)
    {
        $pin = Crypt::decryptString($card->pin);

        return $pin;
    }

    public function formatSingleCard(Card $card): array
    {
        return [
            'id' => $card->id,
            'account_id' => $card->account_id,
            'alias' => $card->alias,
            'card_number' => $card->card_number,
            'cvv' => $card->cvv,
            'expiration_date' => $card->expiration_date->format('m/Y'),
            'status' => $card->status,
            'type' => $card->type,
            'holder' => $card->holder,
        ];
    }

    public function formatCards(Collection $cards): array
    {
        return $cards->map(fn($card) => $this->formatSingleCard($card))->toArray();
    }

    public function createCard(Account $account, array $data, string $holderName)
    {
        $cardNumber = self::generateCard();
        $ccv = self::generateCVV();
        $pin = self::generatePin();

        $card = Card::create([
            'account_id' => $account->id,
            'card_number' => $cardNumber,
            'cvv' => $ccv,
            'expiration_date' => now()->addYears(5),
            'alias' => $data['alias'] ?? null,
            'status' => 'active',
            'type' => $data['type'] ?? 'debit',
            'pin' => Crypt::encryptString($pin),
            'holder' => $holderName,
        ]);

        return $card;
    }

    public function updateCard(Card $card, array $data)
    {
        return $card->update([
            'alias' => $data['alias'] ?? $card->alias,
            'status' => $data['status'] ?? $card->status,         
        ]);
    }

    public function updatePinCard(Card $card, int $newPin)
    {
        return $card->update([
            'pin' => Crypt::encryptString($newPin),
        ]);
    }

    public static function generateCVV()
    {
        $faker = Faker::create();

        $cvv = $faker->numberBetween(100, 999);

        return $cvv;
    }

    public static function generateCard()
    {
        $faker = Faker::create();

        $card = $faker->creditCardNumber();

        return $card;       
    }

    public static function generatePin()
    {
        $faker = Faker::create();

        $pin = $faker->numberBetween(1000, 9999);

        return $pin;     
    }
}