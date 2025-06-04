<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Facades\JWTAuth;
class PasswordResetController extends Controller
{
    /**
     * Updates the authenticated user's password.
     * Checks if the current password is correct and different from the new one.
     *
     * @param UpdatePasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = User::UserInfo()
                      ->where('users.id', JWTAuth::user()->id)
                      ->first();

        if(!Hash::check($request->current_password, $user->password)){
            return response()->json([
                'message' => __('auth.passwords.current_password_incorrect'),
            ], 400);
        }

        if ($request->current_password === $request->password) {
            return response()->json([
                'message' => __('auth.passwords.new_password_same_as_current'),
            ], 400);
        }

        $user->update([
            "password" => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => __('auth.passwords.password_updated_successfully'),
        ], 200);
    }

    /**
     * Sends a password reset link to the specified email address.
     *
     * @param ForgotPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLink(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink($request->only('email'));

        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(['message' => __('auth.passwords.reset_link_sent')], 200);
        }

        return response()->json(['message' => __('auth.passwords.error_sending_reset_link')], 400);
    }

    /**
     * Resets the password for the given email and token.
     *
     * @param ResetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => __('auth.passwords.password_reset_successfully')], 200);
        }

        return response()->json(['message' => __('auth.passwords.password_reset_failed')], 400);
    }
}
