<?php

namespace App\Http\Middleware\Auth;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class Verify2FA
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = User::UserInfo()
                    ->where('users.id', JWTAuth::user()->id)
                    ->first();

        if(!$user || ($user->google2fa_secret &&!$user->google2fa_enabled)){
            return response()->json([
                'message' => __('auth.2fa.two_factor_authentication_required'),
                '2fa' => true,
            ]);
        }

        return $next($request);
    }
}
