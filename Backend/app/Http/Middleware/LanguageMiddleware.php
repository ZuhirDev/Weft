<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;

class LanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->header('Accept-Language') && array_key_exists($request->header('Accept-Language'), config('languages')))
        {
            App::setlocale($request->header('Accept-Language'));
        }else{
            App::setlocale(config('app.fallback_locale'));
        }

        return $next($request);
    }
}
