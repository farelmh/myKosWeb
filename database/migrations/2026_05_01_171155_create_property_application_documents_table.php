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
        Schema::create('property_application_documents', function (Blueprint $table) {
            $table->id();

            $table->foreignId('property_application_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->enum('type', ['identity','ownership','other']);
            $table->string('file_path');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_application_documents');
    }
};
