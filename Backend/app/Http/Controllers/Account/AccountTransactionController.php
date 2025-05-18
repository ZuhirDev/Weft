<?php

namespace App\Http\Controllers\Account;

use App\Helpers\Datatable;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\IbanRequest;
use App\Http\Requests\Transaction\AccountTransactionRequest;
use App\Models\Account;
use App\Models\Customer;
use App\Models\Transaction;
use App\Services\AccountService;
use App\Services\AccountTransactionService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountTransactionController extends Controller
{
    protected $user;
    protected $accountService;
    protected $accountTransaction;

    public function __construct(AccountTransactionService $accountTransaction, AccountService $accountService)
    {
        $this->user = JWTAuth::user();
        $customer = Customer::where('user_id', $this->user->id)->first();
        $this->user = $customer;
        $this->accountTransaction = $accountTransaction;
        $this->accountService = $accountService;
    }

    public function deposit(AccountTransactionRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        $transaction = $this->accountTransaction->depositFunds($account, $request->validated());

        if(!$transaction) return response()->json(['message' => 'Ha ocurrido un error']);

        return response()->json([
            'message' => 'Depósito realizado correctamente',
            'transaction' => $transaction,
        ]);
    }

    public function withdraw(AccountTransactionRequest $request)
    {
        // dd("aki");
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);
        
        $balance = $this->accountTransaction->hasEnoughBalance($account, $request->amount);
        
        if (!$balance) return response()->json(['error' => 'Fondos insuficientes'], 400);
        
        $transaction = $this->accountTransaction->withdrawalFunds($account, $request->validated());

        return response()->json([
            'message' => 'Retiro realizado correctamente',
            'transaction' => $transaction,
        ]);
    }

    public function transfer(AccountTransactionRequest $request)
    {
        $origin = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$origin) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        if(!$request->destination_iban) return response()->json(['message' => 'Es necesario la cuenta de destino'], 404);
        
        $destination = Account::where('iban', $request->destination_iban)->first();
        
        if (!$destination) return response()->json(['error' => 'Cuenta de origen o destino no encontrada'], 404);
        
        $balance = $this->accountTransaction->hasEnoughBalance($origin, $request->amount);
        
        if (!$balance) return response()->json(['error' => 'Fondos insuficientes'], 400);
        
        $transaction = $this->accountTransaction->transferFunds($origin, $destination, $request->validated());

        return response()->json([
            'message' => 'Transferencia realizada correctamente',
            'transaction' => $transaction,
        ]);
    }

    public function externalTransfer(AccountTransactionRequest $request)
    {
        $origin = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$origin) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        if(!$request->external_iban) return response()->json(['message' => 'Es necesario la cuenta de destino'], 404);

        $balance = $this->accountTransaction->hasEnoughBalance($origin, $request->amount);
        
        if (!$balance) return response()->json(['error' => 'Fondos insuficientes'], 400);

        $transaction = $this->accountTransaction->transferExternalFunds($origin, $request->validated());
        
        return response()->json([
            'message' => 'Transferencia externa registrada',
            'transaction' => $transaction,
        ]);
    }

    public function accountTransactions(IbanRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        $transactions = $this->accountTransaction->getAccountTransactions($account);

        return response()->json($transactions);
    }

    public function all(Request $request)
    {
        $customer = Customer::find(2);
        // dd($customer);
        $table = Transaction::AllCustomerTransactions($customer);

        // dd($table->get());

        return Datatable::of($table)
                        ->toResponse();
    }

    public function getLatestTransactions(Request $request)
    {
        $transactions = $this->accountTransaction->latestTransactions($this->user->id);

        return response()->json([
            'transactions' => $transactions,
        ]);
    }
}
