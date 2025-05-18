<?php

namespace App\Http\Controllers;

use App\Http\Requests\Account\AccountUpdateRequest;
use App\Http\Requests\Account\IbanRequest;
use App\Http\Requests\Account\StoreRequest;
use App\Models\Customer;
use App\Services\AccountService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountController extends Controller
{
    protected $user;
    protected $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->user = JWTAuth::user();
        $customer = Customer::where('user_id', $this->user->id)->first();
        $this->user = $customer;
        $this->accountService = $accountService;
    }

    public function show()
    {
        $accounts = $this->accountService->getAccountsByCustomerId($this->user->id);

        $formattedAccounts  = $this->accountService->formatAccounts($accounts, $this->user->name);

        return response()->json([
            'message' => 'Informacion de cuenta',
            'accounts' => $formattedAccounts,
        ]);
    }

    public function showAccountDetails(IbanRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
        
        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);
        
        $formattedAccount  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => 'Detalles de cuenta',
            'account' => $formattedAccount,
        ]);
    }


    public function store(StoreRequest $request)
    {
        $account = $this->accountService->createAccount($this->user->id, $request->validated());

        if(!$account) return response()->json(['message' => 'ha ocurrido un error, repitelo de nuevo ']);

        $account  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => 'Account created successfully',
            'account' => $account,
        ]);
    }

    public function addHolder(Request $request) /// terminar implementación
    {
        dd("PENDIENTE DE TERMINAR");
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);

        $addHolder = $this->accountService->addHolder($account, $this->user->id);

        return response()->json(['message' => 'Holder added successfully.'], 200);
        
    }

    public function destroy(IbanRequest $request)
    {

        $account = $this->accountService->getAccountWithTrashed($this->user->id, $request->iban);

        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);
                
        if ($account->deleted_at !== null) return response()->json(['message' => 'La cuenta ya ha sido eliminada'], 400);
    
        $deleted = $this->accountService->deleteAccount($account);

        if (!$deleted ) return response()->json(['message' => 'No se pudo eliminar la cuenta'], 400);
         
        $formattedAccount  = $this->accountService->formatSingleAccount($account, $this->user->name);

        return response()->json([
            'message' => 'Cuenta eliminada correctamente',
            'account' => $formattedAccount,
        ]);
    }

    public function update(AccountUpdateRequest $request)
    {
        $account = $this->accountService->getAccountByCustomerId($this->user->id, $request->iban);
    
        if (!$account) return response()->json(['message' => 'Cuenta no encontrada'], 404);
        
        $updated = $this->accountService->updateAccount($account, $request->validated());
        
        return response()->json(['message' => 'Cuenta actualizada correctamente', 'data' => $updated]);
    }

}
