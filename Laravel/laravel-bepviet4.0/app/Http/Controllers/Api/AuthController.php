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
    // Đăng ký
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50|unique:users', // Sửa 'name' thành 'username' cho khớp DB
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tạo user mới
        $user = User::create([
            'username' => $request->username, // Lấy từ request username
            'email' => $request->email,
            'password' => Hash::make($request->password), // Mã hóa password (Bcrypt)
            'role_id' => 2, // MẶC ĐỊNH: 2 là User thường (Admin là 1)
            'status' => 1,  // MẶC ĐỊNH: 1 là Active
            'avatar' => null // Để null hoặc gán ảnh mặc định nếu muốn
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng ký thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    // Đăng nhập
    public function login(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Kiểm tra thông tin đăng nhập VÀ trạng thái status phải là 1 (Active)
        // Auth::attempt sẽ tự động so sánh password đã mã hóa
        $credentials = [
            'email' => $request['email'], 
            'password' => $request['password'],
            'status' => 1 // QUAN TRỌNG: Chỉ cho phép tài khoản Active đăng nhập
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác hoặc tài khoản đã bị khóa'
            ], 401);
        }

        // Lấy thông tin user sau khi đăng nhập thành công
        $user = User::where('email', $request['email'])->firstOrFail();
        
        // Xóa token cũ nếu muốn (tùy chọn) để login trên 1 thiết bị
        // $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Chào mừng bạn trở lại',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
}