<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
});

Route::post('project/fetch-all', [ProjectController::class, 'fetch']);
Route::get('project/fetch/{id}', [ProjectController::class, 'fetchSingleRecord']);
Route::post('project/save', [ProjectController::class, 'store']);
Route::post('project/update/{id}', [ProjectController::class, 'update']);

Route::post('task/fetch-all', [TaskController::class, 'fetch']);
Route::get('task/fetch/{id}', [KanbanController::class, 'show']);
Route::post('task/save', [TaskController::class, 'store']);
Route::post('task/update/{id}', [KanbanController::class, 'update']);
Route::get('task/fetch-figures', [DashboardController::class, 'fetchFigures']);

Route::post('user/fetch-all', [UserController::class, 'fetch']);
Route::get('user/fetch/{id}', [UserController::class, 'view']);
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/update/{id}', [UserController::class, 'update']);