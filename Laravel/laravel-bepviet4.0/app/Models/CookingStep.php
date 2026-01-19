<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CookingStep extends Model
{
    use HasFactory;

    // Khai báo đúng tên bảng trong database
    protected $table = 'cooking_steps'; 
    
    protected $fillable = ['recipe_id', 'step_number', 'content', 'image'];
}