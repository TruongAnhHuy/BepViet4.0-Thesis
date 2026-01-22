<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // 1. Khai báo đúng tên bảng trong Database
    protected $table = 'blog_posts'; 

    // 2. Khai báo các cột được phép sửa
    protected $fillable = [
        'title', 
        'content', 
        'image_path', // Tên cột ảnh phải khớp với DB
        'status',     // <--- BẮT BUỘC CÓ để update trạng thái
        'user_id',
        'views'
    ];
}
