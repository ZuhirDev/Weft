<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountUpdateRequest;
use App\Http\Requests\Account\IbanRequest;
use App\Http\Requests\Account\StoreRequest;
use App\Models\Customer;
use App\Services\AccountService;
use App\Services\AccountTransactionService;
use App\Services\CardService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountController extends Controller
{
    protected $user;
    protected $accountService;
    protected $cardService;
    protected $accountTransaction;

    public function __construct(AccountService $accountService, CardService $cardService, AccountTransactionService $accountTransaction)
    {
        $this->user = JWTAuth::user();
        $customer = Customer::where('user_id', $this->user->id)->first();
        $this->user = $customer;
        $this->accountService = $accountService;
        $this->cardService = $cardService;
        $this->accountTransaction = $accountTransaction;
    }

    public function show()
    {
        $accounts = $this->accountService->getAccountsByCustomerId($this->user->id);

        $formattedAccounts  = $this->accountService->formatAccounts($accounts, $this->user->name);

        return response()->json([
            'message' => __('account/messages.accounts_info'),
            'accounts' => $formattedAccounts,
        ]);
    }

    public function showAccountDetails(IbanRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);
        
        $formattedAccount  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => __('account/messages.account_info'),
            'account' => $formattedAccount,
        ]);
    }


    public function store(StoreRequest $request)
    {
        dd("aaaa");
        $account = $this->accountService->createAccount($this->user->id, $request->validated());

        if(!$account) return response()->json(['message' => __('account/messages.account_creation_failed')]);

        $account  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => __('account/messages.account_created'),
            'account' => $account,
        ]);
    }

    public function addHolder(Request $request) /// terminar implementación
    {
        dd("PENDIENTE DE TERMINAR");
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);

        $addHolder = $this->accountService->addHolder($account, $this->user->id);

        return response()->json(['message' => 'Holder added successfully.'], 200);
        
    }

    public function destroy(IbanRequest $request)
    {

        $account = $this->accountService->getAccountWithTrashed($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);
                
        if ($account->deleted_at !== null) return response()->json(['message' => __('account/messages.account_already_deleted')], 400);
    
        $deleted = $this->accountService->deleteAccount($account);

        if (!$deleted ) return response()->json(['message' => __('account/messages.account_delete_failed')], 400);
         
        $formattedAccount  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => __('account/messages.account_deleted'),
            'account' => $formattedAccount,
        ]);
    }

    public function update(AccountUpdateRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
    
        if (!$account) return response()->json(['message' => __('account/messages.account_not_found')], 404);
        
        $updated = $this->accountService->updateAccount($account, $request->validated());
        
        return response()->json(['message' => __('account/messages.account_updated'), 'data' => $updated]);
    }

    public function getAllAccountsInfo()
    {
        $accounts = $this->accountService->getAccountsByCustomerId($this->user->id);

        $data = $accounts->map(function ($account) {
            $formattedAccount = $this->accountService->formatSingleAccount($account, $this->user->name);

            $card = $this->cardService->getCardByAccount($account->iban);
            $formattedCard = $this->cardService->formatSingleCard($card);

            $transactions = $this->accountTransaction->latestTransactionsByAccount($account->id);
            $formattedTransactions = $this->accountTransaction->formatTransactions($transactions);

            $formattedAccount['card'] = $formattedCard;
            $formattedAccount['transactions'] = $formattedTransactions;

            return $formattedAccount;
        });

        return response()->json([
            'message' => __('account/messages.accounts_info'),
            'accounts' => $data,
        ]); 
    
    }
}
