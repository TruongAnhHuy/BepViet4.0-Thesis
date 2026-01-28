<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        try {
            $userNameCol = DB::getSchemaBuilder()->hasColumn('users', 'username') ? 'username' : 'name';

            $posts = DB::table('blog_posts')
                ->join('users', 'blog_posts.user_id', '=', 'users.id')
                ->select(
                    'blog_posts.*', 
                    "users.$userNameCol as author_name"
                )
                ->orderBy('blog_posts.created_at', 'desc')
                ->get();

            $data = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'excerpt' => mb_substr(strip_tags($post->content), 0, 100) . '...',
                    'image_path' => $post->image_path,
                    'created_at' => $post->created_at,
                    'status' => $post->status,
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
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('uploads/blog', $filename, 'public'); 
                $imagePath = 'storage/' . $path; 
            }

            $post = Post::create([
                'user_id' => 1, 
                'title' => $request->title,
                'content' => $request->content,
                'image_path' => $imagePath,
                'status' => 0, 
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'Bài viết đã được gửi và đang chờ Admin duyệt!',
                'data' => $post
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi Server: ' . $e->getMessage()
            ], 500);
        }
    }

  
    public function updateStatus(Request $request, $id)
    {
        $newStatus = $request->input('status');

        $affected = DB::table('blog_posts')
            ->where('id', $id)
            ->update([
                'status' => $newStatus,
                'updated_at' => now()
            ]);

        if ($affected) {
            return response()->json(['message' => 'Cập nhật thành công!'], 200);
        } else {
            return response()->json(['message' => 'Đã cập nhật (hoặc dữ liệu không đổi)'], 200);
        }
    }

  
    public function myPosts(Request $request)
    {
        $user = $request->user()->id;
       $posts=Post::where("user_id",$user)->get();
         return response()->json([
            "status"=>true,
            "posts"=>$posts
         ]);
    }

    
    public function show($id)
    {
        try {
            // 1. Kiểm tra cột name/username
            $userCol = \Illuminate\Support\Facades\Schema::hasColumn('users', 'name') ? 'name' : 'username';

            // 2. Truy vấn
            $post = \Illuminate\Support\Facades\DB::table('blog_posts')
                ->leftJoin('users', 'blog_posts.user_id', '=', 'users.id')
                ->where('blog_posts.id', $id)
                ->select(
                    'blog_posts.*',
                    "users.$userCol as author_name"
                )
                ->first();

            if (!$post) {
                return response()->json(['message' => 'Bài viết không tồn tại'], 404);
            }

            
            return response()->json([
                'status' => 200,
                'data' => [
                    'id' => $post->id,
                    'user_id' => $post->user_id, 
                    'title' => $post->title,
                    'content' => $post->content,
                    'image_path' => $post->image_path,
                    'created_at' => $post->created_at,
                    'status' => $post->status,
                    'user' => [
                        'username' => $post->author_name ?? 'Người dùng đã xóa',
                        'name' => $post->author_name ?? 'Ẩn danh'
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi: ' . $e->getMessage()], 500);
        }
    }
}