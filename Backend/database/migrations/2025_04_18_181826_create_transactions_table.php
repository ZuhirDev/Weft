<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('origin_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->foreignId('destination_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->string('external_destination_iban')->nullable();
            $table->foreignId('card_id')->nullable()->constrained('cards')->onDelete('cascade');

            $table->string('reference')->unique();
            $table->string('reference')->unique();
            $table->decimal('amount', 15, 2)->default(0.00);
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->enum('type', ['deposit', 'withdrawal', 'transfer', 'fee', 'card_payment'])->default('transfer');
            $table->enum('type', ['deposit', 'withdrawal', 'transfer', 'fee', 'card_payment'])->default('transfer');
            $table->string('concept')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
