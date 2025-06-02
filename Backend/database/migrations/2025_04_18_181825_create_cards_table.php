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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');

            $table->string('alias');
            $table->string('pin');
            $table->string('card_number', 16)->unique();
            $table->string('cvv', 3);
            $table->date('expiration_date');
            $table->enum('status', ['active', 'blocked', 'expired'])->default('active');
            $table->enum('type', ['debit', 'credit'])->default('debit');

            $table->timestamps();
            $table->softDeletes();  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
