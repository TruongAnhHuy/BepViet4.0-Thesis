<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // ✅ CHUẨN – RẤT QUAN TRỌNG


class AuthController extends Controller
{
    /**
     * ĐĂNG NHẬP
     */
    public function login(Request $request)
    {
        // 1️⃣ Validate dữ liệu
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // 2️⃣ Tìm user theo email
        $user = User::where('email', $request->email)->first();

        // 3️⃣ Kiểm tra user & password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email hoặc mật khẩu không đúng'
            ], 401);
        }

        // 4️⃣ Xoá token cũ (tránh trùng token)
        $user->tokens()->delete();

        // 5️⃣ Tạo token mới
        $token = $user->createToken('auth_token')->plainTextToken;

        // 6️⃣ Trả về JSON
        return response()->json([
            'message' => 'Đăng nhập thành công',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role_id ?? null
            ]
        ], 200);
    }

    /**
     * ĐĂNG XUẤT
     */
    public function logout(Request $request)
{
    if ($request->user()) {
        $request->user()->tokens()->delete(); // xoá TẤT CẢ token
    }

    return response()->json([
        'message' => 'Đăng xuất thành công'
    ], 200);
}

    public function profile(Request $request)
{
    return response()->json($request->user());
}


public function register(Request $request)
{
    $request->validate([
        'username' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|confirmed|min:6',
    ]);

    $user = User::create([
        'name'     => $request->username, // 👈 MAP username → name
        'email'    => $request->email,
        'password' => Hash::make($request->password), // 👈 HASH ĐÚNG
        'role_id'  => 2
    ]);

    return response()->json([
        'message' => 'Đăng ký thành công',
        'user' => $user
    ], 201);
}
public function getProfile(Request $request)
    {
        // Lấy thông tin user đang đăng nhập từ token
        $user = $request->user(); 

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'user' => $user, // Trả về toàn bộ thông tin user
        ], 200);
    }

}


