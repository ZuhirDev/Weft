<?php

namespace App\Http\Controllers\Card;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\IbanRequest;
use App\Http\Requests\Card\CardPinUpdateRequest;
use App\Http\Requests\Card\CardRequest;
use App\Http\Requests\Card\CardUpdateRequest;
use App\Http\Requests\Card\CreateCardRequest;
use App\Models\Card;
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

        if ($allCards->isEmpty()) return response()->json(['message' => __('card/messages.cards_not_found')], 404);
        
        $formattedCards = $this->cardService->formatCards($allCards);

        return response()->json([
            'message' => __('card/messages.cards_retrieved'),
            'cards' => $formattedCards
        ]);
    }

    public function getCardsByAccount(IbanRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);

        $cards = $this->cardService->getCardsByAccount($account->iban);

        $formattedCards = $this->cardService->formatCards($cards);

        return response()->json([
            'message' => __('card/messages.account_cards_retrieved'),
            'cards' => $formattedCards
        ]);
    }

    public function store(CreateCardRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);

        $card = $this->cardService->createCard($account, $request->validated(), $this->user->name);
        
        $formattedCard = $this->cardService->formatSingleCard($card);

        return response()->json([
            'message' => __('card/messages.card_created'),
            'card' => $formattedCard
        ], 201);
    }

    public function showPin(CardRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => __('card/messages.card_not_found')], 404);

        $pin = $this->cardService->getPinCard($card);

        return response()->json([
            'message' => __('card/messages.pin_retrieved'),
            'pin' => $pin,
        ]);
    }

    public function updatePin(CardPinUpdateRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => __('card/messages.card_not_found')], 404);
        
        $this->cardService->updatePinCard($card, $request->new_pin);

        return response()->json(['message' => __('card/messages.pin_updated')]);
    }

    public function update(CardUpdateRequest $request)
    {
        $card = $this->cardService->getCardByNumber($request->card_number);

        if (!$card) return response()->json(['message' => __('card/messages.card_not_found')], 404);
        
        $this->cardService->updateCard($card, $request->validated());

        return response()->json(['message' => __('card/messages.card_updated')]);
    }

    public function cardTypes()
    {
        return response()->json([
            'message' => __('card/messages.card_types'),
            'data' => Card::getTypes(),
        ]);
    }
}
