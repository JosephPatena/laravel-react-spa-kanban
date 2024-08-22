<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::resource('project', ProjectController::class);
Route::post('projects-fetch', [ProjectController::class, 'fetch'])->name('project.fetch');
Route::post('project-destroy-all', [ProjectController::class, 'destroyAll'])->name('project.destroy_all');
Route::resource('user', UserController::class);
Route::post('users-fetch', [UserController::class, 'fetch'])->name('user.fetch');
Route::resource('task', TaskController::class);
Route::post('tasks-fetch/{project_id}', [TaskController::class, 'fetch'])->name('task.fetch');
Route::resource('kanban', KanbanController::class);
Route::post('update-category', [KanbanController::class, 'updateCategory'])->name('kanban.category-update');

Route::middleware(['auth'])->group(function () {
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
