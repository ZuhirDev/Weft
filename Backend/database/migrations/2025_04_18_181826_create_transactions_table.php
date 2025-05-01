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
            $table->string('origin_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->string('destination_account_id')->nullable()->constrained('accounts')->onDelete('cascade');
            $table->foreignId('card_id')->nullable()->constrained('cards')->onDelete('cascade');

            $table->string('transaction_id')->unique();
            $table->decimal('amount', 15, 2)->default(0.00);
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
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
