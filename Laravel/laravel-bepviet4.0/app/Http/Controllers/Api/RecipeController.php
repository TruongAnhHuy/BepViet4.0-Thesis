<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Rating; // Đảm bảo đã import Model Rating
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    // 1. API Lấy danh sách món ăn
    public function index()
    {
        $recipes = Recipe::orderBy('created_at', 'desc')->get();
        return response()->json($recipes);
    }

    // 2. API Lấy chi tiết món ăn (ĐÃ SỬA LẠI ĐỂ HIỆN RATING)
    public function show($id)
    {
        $recipe = Recipe::with([
            'user', 
            'ingredients', 
            'cookingSteps', 
            'comments.user'
        ])->find($id);
    
        if (!$recipe) {
            return response()->json(['message' => 'Không tìm thấy'], 404);
        }

        // --- BỔ SUNG LOGIC RATING ---
        
        // A. Tính điểm trung bình của món này
        $averageRating = Rating::where('recipe_id', $id)->avg('stars');

        // B. Kiểm tra xem user đang xem đã đánh giá chưa
        $userRating = 0; // Mặc định là 0 (chưa đánh giá)
        
        // Kiểm tra qua Sanctum xem có token đăng nhập không
        if (auth('sanctum')->check()) {
            $currentUserId = auth('sanctum')->id();
            
            // Tìm trong bảng ratings
            $ratingRecord = Rating::where('user_id', $currentUserId)
                                  ->where('recipe_id', $id)
                                  ->first();
            
            if ($ratingRecord) {
                $userRating = $ratingRecord->stars; // Lấy số sao (Ví dụ: 5)
            }
        }

        // C. Gộp dữ liệu món ăn và thông tin rating để trả về
        // Chuyển recipe sang mảng và thêm 2 trường mới vào
        $responseData = $recipe->toArray();
        $responseData['average_rating'] = round($averageRating ?? 0, 1);
        $responseData['user_rating'] = $userRating;
    
        return response()->json($responseData);
    }

    // 3. API Duyệt bài
    public function updateStatus(Request $request, $id)
    {
        $recipe = Recipe::find($id);
        if ($recipe) {
            $recipe->status = $request->status; 
            $recipe->save();
            return response()->json(['message' => 'Cập nhật thành công']);
        }
        return response()->json(['message' => 'Không tìm thấy món'], 404);
    }

    // 4. API Đánh giá sao
    public function rateRecipe(Request $request, $id)
    {
        // Kiểm tra đăng nhập (Dùng Sanctum)
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Bạn cần đăng nhập để đánh giá'], 401);
        }

        $userId = auth('sanctum')->id(); // Lấy ID an toàn từ token
        $stars = $request->input('stars');

        // Lưu hoặc cập nhật đánh giá
        Rating::updateOrCreate(
            ['user_id' => $userId, 'recipe_id' => $id],
            ['stars' => $stars]
        );

        // Tính lại điểm trung bình mới nhất
        $newAverage = Rating::where('recipe_id', $id)->avg('stars');

        return response()->json([
            'message' => 'Đánh giá thành công!',
            'average_rating' => round($newAverage, 1)
        ]);
    }
    public function comment(Request $request, $id)
    {
        // Kiểm tra đăng nhập
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Bạn cần đăng nhập để bình luận'], 401);
        }

        $request->validate([
            'content' => 'required|string|max:1000', // Bắt buộc phải nhập nội dung
        ]);

        $userId = auth('sanctum')->id();

        // Tạo bình luận mới
        $comment = Comment::create([
            'user_id' => $userId,
            'recipe_id' => $id,
            'content' => $request->content
        ]);

        // Quan trọng: Load thêm thông tin User vừa bình luận (để React hiển thị Avatar/Tên ngay lập tức)
        $comment->load('user');

        return response()->json([
            'message' => 'Bình luận thành công!',
            'comment' => $comment // Trả về bình luận mới để React ghép vào danh sách
        ]);
    }
    // 3.thêm công thức mới
    public function store(Request $request) {
    // 1. Validate dữ liệu
    try {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'cooking_time' => 'required|integer',
            'user_id' => 'required|integer',
            'status' => 'required|integer',
            'image_path' => 'nullable' // Cho phép null
        ]);

        // 2. Tạo bản ghi
        $recipe = Recipe::create($validated);

        return response()->json($recipe, 201);
        } catch (\Exception $e) {
            // Log lỗi ra để xem trong storage/logs/laravel.log
            // \Log::error($e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function getMyRecipes(Request $request)
    {
        // lấy id của người dùng đăng nhập ở thời điểm hiện tại
        $user=$request->user()->id;
        // Lấy danh sách món ăn của người dùng có id là $user
        /**
         * SELECT *
         * FROm Recipes
         * WHERE user_id=$user
         */
        $recipes=Recipe::where("user_id",$user)->get();
         return response()->json([
            "status"=>true,
            "recipes"=>$recipes
         ]);
    }
}