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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            $table->string('alias');
            $table->string('iban', 32)->unique();
            $table->decimal('balance', 15, 2)->default(0.00);
            $table->string('swift', 11);
            $table->enum('status', ['active', 'blocked', 'closed'])->default('active');
            $table->enum('type', ['checking', 'savings', 'investment'])->default('checking');
            $table->date('open_date')->default(now());

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
