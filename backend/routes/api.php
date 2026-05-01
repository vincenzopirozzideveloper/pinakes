<?php

declare(strict_types=1);

use App\Interface\Http\Controller\Api\V1\Auth\LoginController;
use App\Interface\Http\Controller\Api\V1\Auth\LogoutController;
use App\Interface\Http\Controller\Api\V1\Auth\MeController;
use App\Interface\Http\Controller\Api\V1\Content\NoteController;
use Illuminate\Support\Facades\Route;

Route::get('/up', fn () => ['ok' => true]);

Route::prefix('v1')->group(function (): void {

    Route::post('/login', [LoginController::class, 'store']);

    Route::middleware('auth:sanctum')->group(function (): void {

        Route::post('/logout', [LogoutController::class, 'destroy']);
        Route::get('/me', [MeController::class, 'show']);

        Route::middleware('workspace')
            ->prefix('w/{workspace}')
            ->group(function (): void {
                Route::apiResource('notes', NoteController::class)
                    ->parameters(['notes' => 'slug']);
            });
    });
});
