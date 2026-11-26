<?php


use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Api\PromotionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\BranchController;

// BRANCH ROUTES
Route::get('/branches', [BranchController::class, 'index']);
Route::post('/admin/branches', [BranchController::class, 'store']);
Route::get('/admin/branches/{id}', [BranchController::class, 'show']);
Route::put('/admin/branches/{id}', [BranchController::class, 'update']);
Route::patch('/admin/branches/{id}', [BranchController::class, 'update']);
Route::delete('/admin/branches/{id}', [BranchController::class, 'destroy']);

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

// TEMPORARY PROTECTED MIGRATION STATUS CHECK
Route::post('/temporary-migration-status', function (Request $request) {

    $secret = config('services.migration_secret');
    $providedSecret = $request->header('X-Migration-Secret');

    if (!$secret || !$providedSecret || !hash_equals($secret, $providedSecret)) {
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    Artisan::call('migrate:status');

    return response()->json([
        'message' => 'Migration status retrieved.',
        'status' => Artisan::output()
    ]);
});

// TEMPORARY PROTECTED MIGRATION EXECUTION
Route::post('/temporary-run-migration', function (Request $request) {

    $secret = config('services.migration_secret');
    $providedSecret = $request->header('X-Migration-Secret');

    if (!$secret || !$providedSecret || !hash_equals($secret, $providedSecret)) {
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    Artisan::call('migrate', [
        '--force' => true
    ]);

    return response()->json([
        'message' => 'Migration command completed.',
        'output' => Artisan::output()
    ]);
});
