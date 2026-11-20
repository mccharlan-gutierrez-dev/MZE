<?php

use App\Http\Controllers\Api\PromotionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// PUBLIC: Customer-facing promotional carousel
Route::get('/promotions', [PromotionController::class, 'index']);

// ADMIN: Promotion management
// Authentication will be added before deployment.
Route::prefix('admin')->group(function () {

    // Display all promotions
    Route::get('/promotions', [PromotionController::class, 'adminIndex']);

    // Upload new promotion
    Route::post('/promotions', [PromotionController::class, 'store']);

    // Update existing promotion
    Route::post('/promotions/{id}', [PromotionController::class, 'update']);

    // Activate or deactivate promotion
    Route::patch('/promotions/{id}/status', [PromotionController::class, 'updateStatus']);

    // Delete promotion
    Route::delete('/promotions/{id}', [PromotionController::class, 'destroy']);

});
