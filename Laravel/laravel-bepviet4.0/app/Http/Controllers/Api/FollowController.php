<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{
    // 1. API Toggle Follow (Bấm lần 1 là Theo dõi, bấm lần 2 là Hủy)
    public function toggleFollow(Request $request)
    {
        try {
            $followerId = $request->user()->id;
            $followingId = $request->input('following_id');

            if (!$followingId) {
                return response()->json(['message' => 'Lỗi: Không nhận được ID người cần follow từ React'], 400);
            }

            // Check trùng
            if ($followerId == $followingId) {
                return response()->json(['message' => 'Không thể tự follow chính mình'], 400);
            }

            $exists = \Illuminate\Support\Facades\DB::table('followers')
                ->where('follower_id', $followerId)
                ->where('following_id', $followingId)
                ->exists();

            if ($exists) {
                \Illuminate\Support\Facades\DB::table('followers')
                    ->where('follower_id', $followerId)
                    ->where('following_id', $followingId)
                    ->delete();
                return response()->json(['status' => 'unfollowed', 'message' => 'Đã hủy theo dõi']);
            } else {
                \Illuminate\Support\Facades\DB::table('followers')->insert([
                    'follower_id' => $followerId,
                    'following_id' => $followingId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                return response()->json(['status' => 'followed', 'message' => 'Đã theo dõi thành công']);
            }
        } catch (\Exception $e) {
            // Quan trọng: Trả về lỗi chi tiết để debug
            return response()->json(['message' => 'Lỗi SQL: ' . $e->getMessage()], 500);
        }
    }

    // 2. API Kiểm tra trạng thái (Để hiển thị nút đúng màu trên React khi mới vào trang)
    public function checkFollowStatus(Request $request, $id)
    {
        $followerId = $request->user()->id; // ID của tôi
        $followingId = $id; // ID tác giả bài viết

        $isFollowing = DB::table('followers')
            ->where('follower_id', $followerId)
            ->where('following_id', $followingId)
            ->exists();

        return response()->json(['is_following' => $isFollowing]);
    }
}