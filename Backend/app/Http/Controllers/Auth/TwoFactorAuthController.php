<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FALaravel\Google2FA;
use Tymon\JWTAuth\Facades\JWTAuth;

class TwoFactorAuthController extends Controller
{
    protected $google2fa;

    public function __construct(Google2FA $google2fa)
    {
        $this->google2fa = $google2fa;
    }
    
    /**
     * Enables 2FA for the authenticated user.
     * Generates a secret key and QR code URL for the user to configure in their authenticator app.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function enable2FA(Request $request)
    {
        $user = Auth::user();

        if($user->google2fa_secret){
            return response()->json(['message' => __('auth.2fa.already_enabled')]);
        }

        $secretKey  = $this->google2fa->generateSecretKey();

        User::find($user->id)->update([
            'google2fa_secret' => $secretKey,
        ]);

        $qrCodeURL = $this->google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $secretKey,
        );

        return response()->json([
            'secret' => $secretKey,
            'qr_url' => $qrCodeURL,
        ]); 
    }

    /**
     * Verifies the 2FA code and enables 2FA on the user's account.
     * Invalidates the old JWT and returns a new one.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verify2FA(Request $request)  // CREAR REGLA VALIDACION
    {
        $request->validate([
            'one_time_password' => 'required|numeric|digits:6',
        ]);
        
        $user = Auth::user();

        JWTAuth::invalidate(JWTAuth::getToken());
        

        if(!$user->google2fa_secret) return response()->json(['message' => __('auth.2fa.not_enabled')]); // No está habilitado 2FA

        $valid = $this->google2fa->verifyKey($user->google2fa_secret, $request->one_time_password);

        if(!$valid) return response()->json(['message' => __('auth.2fa.invalid_code')], 400); // Código inválido.

        User::find($user->id)->update([
            'google2fa_enabled' => true,
        ]);

        $newToken = JWTAuth::fromUser($user);  // mirar metodos en web

        return response()->json([
            'message' => __('auth.2fa.enabled_successfully'), // 2FA habilitado con éxito
            'token' => $newToken,
            'user' => $user,
        ]);
    }

    /**
     * Disables 2FA for the authenticated user.
     * Removes the secret and disables the flag.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */    
    public function disable2FA(Request $request)
    {
        $user = Auth::user();

        if(!$user->google2fa_secret) return response()->json(['message' => __('auth.2fa.already_disabled')]); // 2FA ya está deshabilitado

        User::find($user->id)->update([
            'google2fa_secret' => null,
            'google2fa_enabled' => false,
        ]);

        return response()->json(['message' => __('auth.2fa.disabled_successfully')]);
    }
}
