<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('status');
            $table->string('priority');
            $table->string('due_date')->nullable();
            $table->string('start_date')->nullable();
            $table->string('complete_date')->nullable();
            $table->foreignId('assigned_user_id')->nullable()->constrained('users');
            $table->foreignId('tester_user_id')->nullable()->constrained('users');
            $table->foreignId('reviewer_user_id')->nullable()->constrained('users');
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->foreignId('project_id')->constrained('projects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
