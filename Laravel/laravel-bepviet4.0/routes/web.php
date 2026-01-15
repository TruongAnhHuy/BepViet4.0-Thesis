<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/', function () {
    return view('welcome');
});
// Route hiển thị form
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');

// Route xử lý dữ liệu gửi lên (Post)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('admin')->name('admin.')->group(function () {
    
    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('dashboard');

    Route::get('/userreport', function () {
        return view('admin.UserReport');
    })->name('userreport');
    Route::get('/users', function () {
        return view('admin.Users');
    })->name('users');
    // Sau này thêm các route khác:
    // Route::get('/users', [UserController::class, 'index'])->name('users');
});

