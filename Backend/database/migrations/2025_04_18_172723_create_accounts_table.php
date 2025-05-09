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
        /** PERMITIR 2 TITULARES */
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');

            $table->string('alias')->nullable();
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
