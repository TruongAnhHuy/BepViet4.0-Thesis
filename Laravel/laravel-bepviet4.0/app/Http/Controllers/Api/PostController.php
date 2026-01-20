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
}
