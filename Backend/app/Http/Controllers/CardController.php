<?php

namespace App\Http\Controllers;

use App\Http\Requests\Account\IbanRequest;
use App\Http\Requests\Card\CardPinUpdateRequest;
use App\Http\Requests\Card\CardRequest;
use App\Http\Requests\Card\CardUpdateRequest;
use App\Http\Requests\Card\CreateCardRequest;
use App\Models\Customer;
use App\Services\AccountService;
use App\Services\CardService;
use Tymon\JWTAuth\Facades\JWTAuth;

class CardController extends Controller
{
    protected $user;
    protected $accountService;
    protected $cardService;

    public function __construct(AccountService $accountService, CardService $cardService) 
    {
        $this->user = JWTAuth::user();
        $customer = Customer::where('user_id', $this->user->id)->first();
        $this->user = $customer;
        $this->accountService = $accountService;
        $this->cardService = $cardService;
    }

    public function getAllCustomerCards()
    {
        $allCards = $this->cardService->getCardsByCustomerId($this->user->id);

        if ($allCards->isEmpty()) return response()->json(['message' => 'Cards not found'], 404);
        
        $formattedCards = $this->cardService->formatCards($allCards);

        return response()->json([
            'message' => 'All customer cards retrieved successfully',
            'cards' => $formattedCards
        ]);
    }

    public function getCardsByAccount(IbanRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => 'Account not found'], 404);

        $cards = $this->cardService->getCardsByAccount($account->iban);

        $formattedCards = $this->cardService->formatCards($cards);

        return response()->json([
            'message' => 'Account cards retrieved successfully',
            'cards' => $formattedCards
        ]);
    }

    public function store(CreateCardRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => 'Account not found'], 404);

        $card = $this->cardService->createCard($account, $request->validated());
        
        $formattedCard = $this->cardService->formatSingleCard($card);

        return response()->json([
            'message' => 'Card created successfully',
            'card' => $formattedCard
        ], 201);
    }

    public function showPin(CardRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => 'Card not found'], 404);

        $pin = $this->cardService->getPinCard($card);

        return response()->json([
            'message' => 'PIN retrieved successfully',
            'pin' => $pin,
        ]);
    }

    public function updatePin(CardPinUpdateRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => 'Card not found'], 404);
        
        $this->cardService->updatePinCard($card, $request->new_pin);

        return response()->json(['message' => 'PIN updated successfully']);
    }

    public function update(CardUpdateRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => 'Card not found'], 404);
        
        $this->cardService->updateCard($card, $request->validated());

        return response()->json(['message' => 'Card updated successfully']);
    }

}
