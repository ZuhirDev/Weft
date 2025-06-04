<?php

namespace App\Events\Account;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TransactionCompletedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $account;
    protected $transaction;
    protected $message;

    /**
     * Create a new event instance.
     *
     * @param \App\Models\Account $account
     * @param \App\Models\Transaction $transaction
     * @param string $message
     */
    public function __construct(Account $account, Transaction $transaction, string $message)
    {
        $this->account = $account;
        $this->transaction = $transaction;
        $this->message = $message;
    }

    /**
     * Get the name the event should be broadcast as.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'transaction-completed';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|\Illuminate\Broadcasting\Channel[]
     */
    public function broadcastOn()
    {
        return new PrivateChannel('account.' . $this->account->id);
    }

    /**
     * Get the data to broadcast with the event.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith()
    {
        return [
            'transaction' => $this->transaction,
            'account_id' => $this->account->id,
            'balance' => $this->account->balance,
            'message' => $this->message,
        ];
    }
}
