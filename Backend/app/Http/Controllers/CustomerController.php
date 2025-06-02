<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Http\Requests\Customer\StoreUserCustomerRequest;
use App\Http\Requests\Customer\UpdateUserCustomerRequest;
use App\Models\Customer;
use App\Services\AccountService;
use App\Services\CardService;
use App\Services\CustomerService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CustomerController extends Controller
{
    protected $customerService;
    protected $userService;
    protected $accountService;
    protected $cardService;

    public function __construct(CustomerService $customerService, UserService $userService, AccountService $accountService, CardService $cardService)
    {
        $this->customerService = $customerService;
        $this->userService = $userService;
        $this->accountService = $accountService;
        $this->cardService = $cardService;
    }

    public function storeCustomer(StoreCustomerRequest $request)
    {
        $customer = $this->customerService->createCustomer($request->user_id, $request->validated());

        return response()->json([
            'message' => 'Customer created successfully',
            'customer' => $customer,
        ]);
    }

    public function storeUserAndCustomer(StoreUserCustomerRequest $request)
    {
        $user = $this->userService->createUser($request->validated());

        if(!$user) return response()->json(['message' => 'User creation failed'], 500);

        $customer = $this->customerService->createCustomer($user->id, $request->validated());

        if(!$customer) return response()->json(['message' => 'Customer creation failed'], 500);

        $formatted = $this->customerService->formatUserCustomer($user, $customer);

        $defaultAccountData = [
            'alias' => "Cuenta de {$customer->name}", // LANG
            'type' => 'checking',
        ];

        $account = $this->accountService->createAccount($customer->id, $defaultAccountData);

        if(!$account) return response()->json(['message' => __('account/messages.account_creation_failed')]);

        $defaultCardData = [
            'alias' => "Tarjeta Débito de {$customer->name}",
            'type' => 'debit'
        ];

        $card = $this->cardService->createCard($account, $defaultCardData);

        return response()->json([
            'message' => 'User created successfully',
            'customer' => $formatted,
        ], 201);
    }

    public function updateUserAndCustomer(UpdateUserCustomerRequest $request)
    {
        $customer = Customer::where('user_id', JWTAuth::user()->id)->first();

        $customer->update($request->validated());

        return response()->json([
            'message' => 'User updated successfully',
            'customer' => $customer,
        ], 201);
    }

    public function getCustomer()
    {
        $customer = Customer::where('user_id', JWTAuth::user()->id)->first();

        $customer = $this->customerService->getCustomer($customer->id);

        return response()->json([
            'message' => 'Customer retrieved successfully.',
            'customer' => $customer,
        ], 200);

    }
    
}
