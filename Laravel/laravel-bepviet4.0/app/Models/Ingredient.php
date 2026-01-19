<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    // Khai báo đúng tên bảng trong SQL của bạn là 'ingredients'
    protected $table = 'ingredients'; 
    
    protected $fillable = ['ingredient_name'];
}