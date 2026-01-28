<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class UserCommentController extends Controller
{
    public function myComments(Request $request)
    {
        // $user = $request->user();

        // // Lấy bình luận của user kèm thông tin món ăn
        // $comments = Comment::with('recipe')
        //     ->where('user_id', $user->id)
        //     ->orderBy('created_at', 'desc')
        //     ->get()
        //     ->map(function ($comment) {
        //         return [
        //             'id' => $comment->id,
        //             'recipe_id' => $comment->recipe_id,
        //             'recipe_title' => $comment->recipe->title ?? 'Món ăn đã xóa',
        //             'content' => $comment->content,
        //             'created_at' => $comment->created_at->toDateTimeString(),
        //         ];
        //     });
         // lấy id của người dùng đăng nhập ở thời điểm hiện tại
        $user=$request->user()->id;
        
        $comments=Comment::where("user_id",$user)->get();
         return response()->json([
            "status"=>true,
            "comments"=>$comments
         ]);


        
    }
}