<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin() {
        return view('users.login');
    }

    public function showRegister() {
        return view('users.register');
    }

    public function register(Request $request) {
        // Validate dữ liệu
        $request->validate([
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users', // Thêm unique để tránh trùng tên tài khoản
            'password' => 'required|min:6|confirmed',
        ]);

        // Tạo user mới
        User::create([
            'username' => $request->username, // [QUAN TRỌNG] Sửa 'name' thành 'username' theo DB
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 1, // Mặc định kích hoạt (Active)
            // 'role_id' => 2 // Nếu bạn có bảng Role, có thể set mặc định là Member tại đây
        ]);

        return redirect()->route('login')->with('success', 'Đăng ký thành công! Vui lòng đăng nhập.');
    }

    public function login(Request $request) {
        // Dữ liệu đăng nhập
        $credentials = $request->only('email', 'password');

        // Thực hiện đăng nhập
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); // Bảo mật session

            // [QUAN TRỌNG] Chuyển hướng về trang Dashboard Admin ta vừa làm
            return redirect()->route('admin.dashboard'); 
        }

        return back()->withErrors([
            'email' => 'Thông tin đăng nhập không chính xác.',
        ]);
    }
    
    // Thêm chức năng đăng xuất
    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}