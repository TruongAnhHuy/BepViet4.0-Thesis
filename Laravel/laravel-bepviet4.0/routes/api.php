<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LayoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\api\BlogController;
use App\Models\Recipe;
use Symfony\Component\Routing\Router;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RecipeController;

Route::get('/products', [ProductController::class, 'index']);

Route::get('/menu', [LayoutController::class, 'menu']);

Route::get('/slide', [LayoutController::class, 'slide']);

Route::get('/blog', [BlogController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('users', UserController::class);

Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    
    // Lấy thông tin user hiện tại
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // QUAN TRỌNG: Dashboard phải nằm trong này để bảo mật
    Route::get('/dashboard-stats', [DashboardController::class, 'index']);

    // Thêm route Đăng xuất (Logout)
    Route::post('/logout', [AuthController::class, 'logout']);
});