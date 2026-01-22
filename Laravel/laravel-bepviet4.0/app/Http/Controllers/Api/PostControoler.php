<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function index()
    {
        try {
            // Tự động kiểm tra cột tên user là 'username' hay 'name'
            $userNameCol = DB::getSchemaBuilder()->hasColumn('users', 'username') ? 'username' : 'name';

            $posts = DB::table('blog_posts')
                ->join('users', 'blog_posts.user_id', '=', 'users.id')
                ->select(
                    'blog_posts.*', 
                    "users.$userNameCol as author_name"
                )
                ->orderBy('blog_posts.created_at', 'desc')
                ->get();

            // Format dữ liệu trả về
            $data = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'excerpt' => mb_substr(strip_tags($post->content), 0, 100) . '...',
                    'image_path' => $post->image_path,
                    'created_at' => $post->created_at,
                    'user' => [
                        'username' => $post->author_name
                    ]
                ];
            });

            return response()->json([
                'status' => 200,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            // Nếu lỗi, trả về thông báo chi tiết để dễ debug
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        // 1. Tìm bài viết (Laravel sẽ tự tìm trong bảng 'blog_posts' nhờ cấu hình ở Model)
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Không tìm thấy bài viết'], 404);
        }

        // 2. Lấy trạng thái gửi lên (1: Đã đăng, 0: Chờ duyệt)
        $newStatus = $request->input('status');

        // 3. Cập nhật và Lưu
        $post->status = $newStatus;
        $post->save(); // Lệnh này sẽ update xuống database

        return response()->json([
            'message' => 'Cập nhật thành công',
            'data' => $post
        ], 200);
    }
}
