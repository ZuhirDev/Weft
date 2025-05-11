<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

/** CUANDO EN LA SOLICITUD NO HAYA TOKEN PONER ALGUN MENSAJE DE TOKEN INVALIDAO */

class AuthController extends Controller
{
    /**
     * Registers a new user with email and password.
     * Returns the created user data in the response.
     *
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request) 
    {
        $user = User::create([
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        return response()->json([
            "status" => true,
            "message" =>  __('auth.registration_successful', ['name' => $user->email]), /// PONER EL NOMBRE
            "data" => $user,
        ], 201);
    }

    /**
     * Authenticates a user using email and password.
     * Returns a token if successful, otherwise an error message.
     * If 2FA is enabled, returns a message requiring 2FA verification.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $token = JWTAuth::attempt($request->only(['email', 'password']));

        if(!$token){
            return response()->json([
                "status" => false,
                "message" => __('auth.invalid_credentials'),
            ], 401);
        }

        $user = JWTAuth::user();

        if($user->google2fa_secret){
            return response()->json([
                'status' => 403,
                'message' =>  __('auth.two_factor_required'),
                "token" => $token,
                'user' => $user,
            ]);
        }

        return response()->json([
            "message" => __('auth.login_successful', ['name' => $user->email]), /// PONER EL NOMBRE
            "user" => $user,
            "token" => $token,
        ], 200);
    }

    /**
     * Logs out the currently authenticated user.
     * Invalidates the JWT token and disables 2FA.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        User::find(Auth::user()->id)->update([
            'google2fa_enabled' => false,
        ]);

        return response()->json([
            "message" => __('auth.logout_successful'),
        ], 200);
    }

    /**
     * Returns the authenticated user's information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = JWTAuth::user();

        return response()->json([
            "message" => __('auth.user_info_retrieved'),
            "user" => $user,
        ], 200);
    }

    public function validatePassword(Request $request)
    {
        $user = JWTAuth::user();

        if(!Hash::check($request->password, $user->password)){
            return response()->json([
                'message' => 'Contraseña incorrecta',
            ], 401);
        }

        
        return response()->json([
            'message' => 'Contraseña válida',
        ], 200);

    }
}
