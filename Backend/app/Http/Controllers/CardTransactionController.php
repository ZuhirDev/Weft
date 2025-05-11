<?php

namespace App\Http\Controllers;

use App\Http\Requests\Card\CardRequest;
use App\Http\Requests\Transaction\PaymentCardRequest;
use App\Models\Customer;
use App\Services\CardTransactionService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class CardTransactionController extends Controller
{
    protected $user;
    protected $cardTransaction;

    public function __construct(CardTransactionService $cardTransaction)
    {
        $this->user = JWTAuth::user();
        $customer = Customer::where('user_id', $this->user->id)->first();
        $this->user = $customer;
        $this->cardTransaction = $cardTransaction;
    }

    public function payment(PaymentCardRequest $request)
    {
        $card = $this->cardTransaction->getCardByNumber($request->card_number, $this->user->id);
        
        if (!$card) return response()->json(['message' => 'Card Not Found'], 404);

        $account = $card->account;

        $balance = $this->cardTransaction->hasEnoughBalance($account, $request->amount);

        if (!$balance) return response()->json(['message' => 'Fondos insuficientes'], 400);

        $transaction = $this->cardTransaction->createCardTransaction($account, $card->id, $request->validated());

        return response()->json([
            'message' => 'Pago con tarjeta realizado correctamente',
            'transaction' => $transaction,
        ]);
    }

    
    public function getAllTransactions(CardRequest $request)
    {
        $card = $this->cardTransaction->getCardByNumber($request->card_number, $this->user->id);

        if (!$card) return response()->json(['message' => 'Card Not Found'], 404);

        $transactions = $this->cardTransaction->getCardTransaction($card);

        return response()->json($transactions);
    }
}
