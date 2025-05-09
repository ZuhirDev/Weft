<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class TransactionController extends Controller
{
    // protected $user;

    // public function __construct()
    // {
    //     $this->user = JWTAuth::user();
    // }

    // private function AccountByIban($iban)
    // {
    //     $account = Account::where('customer_id', $this->user->id)
    //                     ->where('iban', $iban)
    //                     ->first();

    //     if (!$account) return response()->json(['error' => 'Cuenta no encontrada'], 404); // en caso de no existir no lanza error

    //     return $account;
    // }

    // // CUANDO EL USUARIO PULSE EN TRANSACCION QUE SE MUESTRE SU INFORMACION
    // public function show($id)
    // {
    //     $transaction = Transaction::where('id', $id)
    //         ->where(function ($q) {
    //             $q->whereHas('originAccount', fn($q) => $q->where('customer_id', $this->user->id))
    //             ->orWhereHas('destinationAccount', fn($q) => $q->where('customer_id', $this->user->id));
    //         })->first();

    //     if (!$transaction) return response()->json(['error' => 'Transacción no encontrada'], 404);

    //     return response()->json($transaction);
    // }


    // public function deposit(Request $request)
    // {
    //     $account = $this->AccountByIban($request->iban);

    //     if(!$account) return;

    //     $transaction = Transaction::create([
    //         'origin_account_id' => null,
    //         'destination_account_id' => $account->id,
    //         'reference' => Str::uuid()->toString(),
    //         'amount' => $request->amount,
    //         'status' => 'completed',
    //         'type' => 'deposit',
    //         'concept' => $request->concept,
    //     ]);

    //     $account->increment('balance', $request->amount);

    //     return response()->json([
    //         'message' => 'Depósito realizado correctamente',
    //         'account' => $account->fresh(),
    //         'transaction' => $transaction,
    //     ]);
    
    // }

    // public function withdraw(Request $request)
    // {
    //     $account = $this->AccountByIban($request->iban);

    //     if ($account->balance < $request->amount) {
    //         return response()->json(['error' => 'Fondos insuficientes'], 400);
    //     }

    //     $transaction = Transaction::create([
    //         'origin_account_id' => $account->id,
    //         'destination_account_id' => null,
    //         'reference' => Str::uuid()->toString(),
    //         'amount' => $request->amount,
    //         'status' => 'completed',
    //         'type' => 'withdrawal',
    //         'concept' => $request->concept,
    //     ]);

    //     $account->decrement('balance', $request->amount);

    //     return response()->json([
    //         'message' => 'Retiro realizado correctamente',
    //         'account' => $account->fresh(),
    //         'transaction' => $transaction,
    //     ]);
    // }

    // public function transfer(Request $request)
    // {
    //     $origin = $this->AccountByIban($request->iban);

    //     $destination = Account::where('iban', $request->destination_iban)->first();

    //     if (!$origin || !$destination) {
    //         return response()->json(['error' => 'Cuenta de origen o destino no encontrada'], 404);
    //     }

    //     if ($origin->balance < $request->amount) {
    //         return response()->json(['error' => 'Fondos insuficientes'], 400);
    //     }

    //     $transaction = Transaction::create([
    //         'origin_account_id' => $origin->id,
    //         'destination_account_id' => $destination->id,
    //         'reference' => Str::uuid()->toString(),
    //         'amount' => $request->amount,
    //         'status' => 'completed',
    //         'type' => 'transfer',
    //         'concept' => $request->concept,
    //     ]);

    //     $origin->decrement('balance', $request->amount);
    //     $destination->increment('balance', $request->amount);

    //     return response()->json([
    //         'message' => 'Transferencia realizada correctamente',
    //         'transaction' => $transaction,
    //     ]);
    // }

    // public function externalTransfer(Request $request)
    // {
    //     $origin = $this->AccountByIban($request->iban);

    //     if ($origin->balance < $request->amount) {
    //         return response()->json(['error' => 'Fondos insuficientes'], 400);
    //     }

    //     $transaction = Transaction::create([
    //         'origin_account_id' => $origin->id,
    //         'external_destination_iban' => $request->destination_iban,
    //         'reference' => Str::uuid()->toString(),
    //         'amount' => $request->amount,
    //         'status' => 'completed',
    //         'type' => 'transfer',
    //         'concept' => $request->concept,
    //     ]);

    //     $origin->decrement('balance', $request->amount);

    //     return response()->json([
    //         'message' => 'Transferencia externa registrada',
    //         'transaction' => $transaction,
    //     ]);
    // }

    // public function accountTransactions(Request $request)
    // {
    //     $account = $this->AccountByIban($request->iban);

    //     $transactions = Transaction::where(function ($query) use ($account) {
    //                             $query->where('origin_account_id', $account->id)
    //                                 ->orWhere('destination_account_id', $account->id);
    //                         })
    //                         ->orderBy('created_at', 'desc')
    //                         ->get();

    //     return response()->json($transactions);
    // }

}
