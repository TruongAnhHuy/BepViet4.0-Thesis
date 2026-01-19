<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 1. Lấy danh sách User
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    // 2. Thêm User mới
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $statusValue = ($request->status == 'Active' || $request->status == 1) ? 1 : 0;

        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'status'   => $statusValue,
            'role_id'  => $request->role_id ?? 2,
            'avatar'   => $request->avatar ?? null,
        ]);

        return response()->json([
            'message' => 'Thêm thành công!',
            'user' => $user
        ], 201);
    }

    // 3. Xem chi tiết
    public function show($id)
    {
        $user = User::find($id);
        return $user ? response()->json($user) : response()->json(['message' => 'Không tìm thấy'], 404);
    }

    // 4. Cập nhật
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'Không tìm thấy'], 404);

        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,'.$id,
        ]);

        $dataToUpdate = [
            'username' => $request->username,
            'email'    => $request->email,
            'role_id'  => $request->role_id ?? $user->role_id,
            'avatar'   => $request->avatar ?? $user->avatar,
        ];

        if ($request->has('status')) {
            $dataToUpdate['status'] = ($request->status == 'Active' || $request->status == 1) ? 1 : 0;
        }

        if ($request->filled('password')) {
            $dataToUpdate['password'] = Hash::make($request->password);
        }

        $user->update($dataToUpdate);

        return response()->json(['message' => 'Cập nhật thành công!', 'user' => $user]);
    }

    // 5. Xóa
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Xóa thành công!']);
        }
        return response()->json(['message' => 'Không tìm thấy'], 404);
    }
}