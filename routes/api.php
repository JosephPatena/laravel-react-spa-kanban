<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KanbanController;

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
    Route::get('/', [KanbanController::class, 'index']);
    Route::get('/{id}', [KanbanController::class, 'show']);
    Route::post('/create', [KanbanController::class, 'create']);
    Route::put('/update/{id}', [KanbanController::class, 'update']);
    Route::put('/update/category/{id}', [KanbanController::class, 'updateCategory']);
    Route::delete('/delete/{id}', [KanbanController::class, 'delete']);
});