<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;


class CardTransactionController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::user();
    }

    private function CardByNumber($card_number)
    {
        $card = Card::where('card_number', $card_number)
                    ->whereHas('account', function ($q) {
                        $q->where('customer_id', $this->user->id);
                    })
                    ->first();

        if (!$card) abort(404, 'Tarjeta no encontrada');
        return $card;
    }

    public function payment(Request $request)
    {
        $card = $this->CardByNumber($request->card_number);
        $account = $card->account;

        if ($account->balance < $request->amount) {
            return response()->json(['error' => 'Fondos insuficientes'], 400);
        }

        $transaction = Transaction::create([
            'origin_account_id' => $account->id,
            'card_id' => $card->id,
            'reference' => Str::uuid(),
            'amount' => $request->amount,
            'status' => 'completed',
            'type' => 'card_payment',
            'concept' => $request->concept,
        ]);

        $account->decrement('balance', $request->amount);

        return response()->json([
            'message' => 'Pago con tarjeta realizado correctamente',
            'transaction' => $transaction,
        ]);
    }

    
    public function getAllTransactions(Request $request)
    {
        $card = $this->CardByNumber($request->card_number);

        $transactions = $card->transactions()
                             ->orderBy('created_at', 'desc')
                             ->get();

        return response()->json($transactions);
    }
}
