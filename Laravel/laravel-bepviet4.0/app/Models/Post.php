<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Post extends Model
{
    use HasFactory;

    // --- QUAN TRỌNG NHẤT ---
    // Khai báo tên bảng chính xác như trong phpMyAdmin của bạn
    protected $table = 'blog_posts'; 

    // Các cột được phép chỉnh sửa
    protected $fillable = [
        'user_id', 
        'title', 
        'content', 
        'image_path', 
        'status'
    ];

    // Khai báo mối quan hệ để lấy tên người đăng
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}