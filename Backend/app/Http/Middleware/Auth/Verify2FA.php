<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Verify2FA
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if(!$user || ($user->google2fa_secret &&!$user->google2fa_enabled)){
            return response()->json([
                'message' => __('auth.2fa.two_factor_authentication_required'),
                '2fa' => true,
            ]);
        }

        dd($user);
        return $next($request);
    }
}
