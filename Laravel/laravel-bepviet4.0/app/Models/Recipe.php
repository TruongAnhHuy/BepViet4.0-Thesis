<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
use App\Models\Use;
use App\Models\Ingredient;
class Recipe extends Model
{
    use HasFactory;
    
    protected $table = 'recipes';
    
    // Khai báo các cột được phép thêm sửa
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'cooking_time',
        'image_path',
    ];

    // --- CÁC MỐI QUAN HỆ ---

    // 1. Nối với Ingredients (Nguyên liệu) - QUAN TRỌNG NHẤT
   public function ingredients()
    {
        // belongsToMany(Model, Bảng_Trung_Gian, Khóa_Ngoại_1, Khóa_Ngoại_2)
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient', 'recipe_id', 'ingredient_id')
                    ->withPivot('quantity', 'unit'); // Lấy thêm cột số lượng và đơn vị
    }

    // 2. Nối với User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // 3. Nối với CookingSteps
    public function cookingSteps()
    {
        return $this->hasMany(CookingStep::class, 'recipe_id');
    }

    // 4. Nối với Comments
    public function comments()
    {
        return $this->hasMany(Comment::class, 'recipe_id');
    }
}