<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SystemSetting;
use App\Models\User;

class SystemSettingController extends Controller
{
    /**
     * 1. Lấy toàn bộ cấu hình hệ thống
     * Trả về dạng Key-Value (VD: { "site_name": "Bếp Việt", "maintenance_mode": "1" })
     */
    public function index()
    {
        $settings = SystemSetting::pluck('value', 'key_name');
        return response()->json($settings);
    }

    /**
     * 2. Cập nhật cấu hình hệ thống (Lưu settings chung)
     */
    public function update(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            // updateOrCreate: Nếu key đã có thì sửa, chưa có thì tạo mới
            SystemSetting::updateOrCreate(
                ['key_name' => $key],
                ['value' => $value]
            );
        }

        return response()->json(['message' => 'Cập nhật cấu hình thành công!']);
    }

    /**
     * 3. Lấy danh sách User rút gọn (Dùng cho dropdown chọn Email để phân quyền)
     * Chỉ lấy id, email, username và role_id để tối ưu tốc độ
     */
    public function getUsersList()
    {
        $users = User::select('id', 'email', 'username', 'role_id')->get();
        return response()->json($users);
    }

    /**
     * 4. Cập nhật quyền (Role) cho một User cụ thể
     */
    public function updateUserRole(Request $request)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'user_id' => 'required|exists:users,id', // User ID phải tồn tại trong bảng users
            'role_id' => 'required|exists:roles,id', // Role ID phải tồn tại trong bảng roles
        ]);

        // Tìm user và cập nhật
        $user = User::find($request->user_id);
        
        // Kiểm tra logic phụ (Ví dụ: Không cho phép tự hạ quyền chính mình nếu cần)
        // if ($user->id == auth()->id()) {
        //     return response()->json(['message' => 'Bạn không thể tự thay đổi quyền của chính mình!'], 403);
        // }

        $user->role_id = $request->role_id;
        $user->save();

        return response()->json([
            'message' => 'Đã cập nhật quyền thành công!',
            'user' => $user
        ]);
    }
}
