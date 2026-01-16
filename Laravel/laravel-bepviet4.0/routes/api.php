<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LayoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\api\BlogController;
use App\Models\Recipe;
use Symfony\Component\Routing\Router;

Route::get('/products', [ProductController::class, 'index']);

Route::get('/menu', [LayoutController::class, 'menu']);

Route::get('/slide', [LayoutController::class, 'slide']);

Route::get('/blogs', [BlogController::class, 'index']);

Route::get('/recipes', function () {
    return Recipe::all();
});