<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // --- ĐĂNG KÝ ---
    // ...
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // --- SỬA ĐIỂM 3: VALIDATION ---
            // Đổi 'name' thành 'username'
            'username' => 'required|string|max:50|unique:users', 
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            // --- SỬA ĐIỂM 4: CREATE ---
            // Đổi 'name' thành 'username'
            'username' => $request->username, 
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2,
            'status' => 1,
            'avatar' => null
        ]);

        // ... phần còn lại giữ nguyên
    }
// ...

    // --- ĐĂNG NHẬP ---
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kiểm tra Email, Password và Status = 1
        $credentials = [
            'email' => $request['email'],
            'password' => $request['password'],
            'status' => 1 
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Tài khoản hoặc mật khẩu không đúng, hoặc tài khoản đã bị khóa.'
            ], 401);
        }

        // TỐI ƯU: Lấy user trực tiếp từ Auth thay vì query lại DB
        $user = Auth::user(); 

        // Xóa các token cũ để chỉ cho phép đăng nhập trên 1 thiết bị (Tùy chọn, nếu muốn bảo mật cao)
        // $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // --- ĐĂNG XUẤT (Thêm mới) ---
    public function logout(Request $request)
    {
        // Xóa token hiện tại đang dùng để request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Đăng xuất thành công'
        ]);
    }
}