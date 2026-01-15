<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LayoutController;
use App\Http\Controllers\Api\ProductController;
Route::get('/products', [ProductController::class, 'index']);

Route::get('/menu', [LayoutController::class, 'menu']);
Route::get('/slide', [LayoutController::class, 'slide']);
