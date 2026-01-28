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
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SystemSettingController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserProfileController;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\UserCommentController;
use App\Http\Controllers\Api\FollowController;


Route::post("/",function(){
    return response()->json([
        "message"=>"hello"
    ]);
});

Route::get('/products', [ProductController::class, 'index']);


Route::get('/menu', [LayoutController::class, 'menu']);

Route::get('/slide', [LayoutController::class, 'slide']);

Route::get('/blog', [BlogController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('users', UserController::class);

Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
Route::put('/recipes/{id}/status', [RecipeController::class, 'updateStatus']);
Route::middleware('auth:sanctum')->post('/recipes/{id}/rate', [RecipeController::class, 'rateRecipe']);
Route::middleware('auth:sanctum')->post('/recipes/{id}/comment', [RecipeController::class, 'comment']);

Route::get('/settings', [SystemSettingController::class, 'index']);
Route::post('/settings', [SystemSettingController::class, 'update']);
Route::get('/users-minimal', [SystemSettingController::class, 'getUsersList']);
Route::post('/update-user-role', [SystemSettingController::class, 'updateUserRole']);
Route::get('/recipes-popular', [RecipeController::class, 'popular']);
Route::get('/faq', [FaqController::class, 'index']);
Route::post('/faq', [FaqController::class, 'store']);
Route::put('/users/{id}/status', [UserController::class, 'updateStatus']);
//trang quan ly bài viết
Route::get('/posts', [PostController::class, 'index']);
// Route cập nhật trạng thái
Route::put('/posts/{id}/status', [PostController::class, 'updateStatus']);

Route::post('/posts', [PostController::class, 'store']);

Route::post('/recipes', [RecipeController::class, 'store']);


Route::middleware('auth:sanctum')->group(function () {
    
    // Lấy thông tin user hiện tại
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // QUAN TRỌNG: Dashboard phải nằm trong này để bảo mật
    Route::get('/dashboard-stats', [DashboardController::class, 'index']);

    // Thêm route Đăng xuất (Logout)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/admin/faqs', [FaqController::class, 'adminIndex']);
    Route::put('/admin/faqs/{id}/answer', [FaqController::class, 'answer']);
    // Route::get('/user/my-posts', [PostController::class, 'myPosts']);

    Route::get('/user/profile', [AuthController::class, 'getProfile']); 
//mon an 
    Route::get('/user/recipes', [RecipeController::class, 'getMyRecipes']);
//comment
    Route::get('/user/comment',[UserCommentController::class,'myComments']);
//post
    Route::get('/user/post',[PostController::class,'myPosts']);

    Route::post('/follow', [FollowController::class, 'toggleFollow']);
    Route::get('/follow/check/{id}', [FollowController::class, 'checkFollowStatus']);
});

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/categories', [CategoryController::class, 'store']);

Route::put('/categories/{id}', [CategoryController::class, 'update']);

Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::get('/posts/{id}', [PostController::class, 'show']);

