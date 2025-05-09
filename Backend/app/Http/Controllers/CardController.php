<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Card;
use Illuminate\Http\Request;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Crypt;
use Tymon\JWTAuth\Facades\JWTAuth;

class CardController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::user();
    }
    
    private function CardByNumber($card_numer)
    {
        return Card:://where('customer_id', $this->user->id)
                        //->
                        where('card_number', $card_numer)
                        ->first();
    }

    public function getCardByAccount(Request $request)
    {
        $account = Account::where('iban', $request->iban)->first();

        if (!$account) return response()->json(['message' => 'Account not found'], 404);

        $cards = $account->cards()->get()->map(function($card){
            return [
                'card_number' => $card->card_number,
                'expiration_date' => $card->expiration_date,
                'status' => $card->status,
                'type' => $card->type,
            ];
        });

        return response()->json([
            'message' => 'Account cards retrieved successfully',
            'cards' => $cards
        ]);
    }

    public function store(Request $request)
    {
        $account = Account::where('iban', $request->iban)->first();

        $card = Card::create([
            'account_id' => $account->id,
            'card_number' => $this->generateCard(),
            'cvv' => $this->generateCVV(),
            'expiration_date' => now()->addYears(5),
            'status' => 'active',
            'type' => $request->type,
            'pin' => Crypt::encryptString($this->generatePin()),
        ]);

        return response()->json([
            'message' => 'Card created successfully',
            'card' => $card
        ], 201);
    }

    public function showPin(Request $request)
    {
        $card = $this->CardByNumber($request->card_number);

        $pin = Crypt::decryptString($card->pin);

        return response()->json([
            'message' => 'PIN retrieved successfully',
            'pin' => $pin,
        ]);
    }

    public function updatePin(Request $request)
    {
        $card = $this->CardByNumber($request->card_number);
        
        $card->update([
            'pin' => Crypt::encryptString($request->pin),
        ]);

        return response()->json([
            'message' => 'PIN updated successfully',
            'card' => $card
        ]);
    }

    public function changeStatus(Request $request)
    {
        $card = $this->CardByNumber($request->card_number);

        $card->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Card status updated successfully',
            'card' => $card,
        ]);
    }

    private function generateCVV()
    {
        $faker = Faker::create();

        $cvv = $faker->numberBetween(100, 999);

        return $cvv;
    }

    
    private function generateCard()
    {
        $faker = Faker::create();

        $card = $faker->creditCardNumber();

        return $card;
    }

    private function generatePin()
    {
        $faker = Faker::create();

        $pin = $faker->numberBetween(1000, 9999);

        return $pin;
    }
}
