<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FraudDetectionService
{
    public function isFraudulent(array $data): bool
    {
        $payload = array_merge([
            'old_balance_dest' => 0.0,
            'new_balance_dest' => 0.0,
        ], $data);

        $formattedPayload = [
            'nameOrig' => (string) $payload['nameOrig'],
            'nameDest' => (string) $payload['nameDest'],
            'amount' => (float) $payload['amount'],
            'old_balance_orig' => (float) $payload['old_balance_orig'],
            'new_balance_orig' => (float) $payload['new_balance_orig'],
            'old_balance_dest' => (float) $payload['old_balance_dest'],
            'new_balance_dest' => (float) $payload['new_balance_dest'],
            'type' => strtoupper($payload['type']),
        ];

        $url = env('FRAUD_API_URL', 'http://ai-service:8000/predict');

        try {
            $response = Http::timeout(3)->post($url, $formattedPayload);

            if ($response->successful())
                return $response->json('action') === 'BLOCK_TRANSACTION';

            Log::error('Fraud API error response', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

        } catch (\Throwable $e) {
            Log::error('Fraud service connection error', [
                'message' => $e->getMessage(),
            ]);
        }

        return false;
    }
}