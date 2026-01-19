<?php

namespace App\Http\Controllers\Api; // ✅ Namespace chuẩn cho thư mục Api

use App\Http\Controllers\Controller; // 👈 ĐÂY LÀ DÒNG BẠN THIẾU (Sửa lỗi Class not found)
use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;

class RecipeController extends Controller
{
    // 1. API Lấy danh sách món ăn
    public function index()
    {
        // Lấy tất cả món ăn, sắp xếp mới nhất lên đầu
        $recipes = Recipe::orderBy('created_at', 'desc')->get();
        return response()->json($recipes);
    }

    // 2. API Lấy chi tiết món ăn
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
    
        return response()->json($recipe);
    }
}