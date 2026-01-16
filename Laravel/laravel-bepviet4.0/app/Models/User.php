<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Nhớ import Sanctum

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users'; // Khai báo tên bảng cho chắc chắn
    protected $primaryKey = 'user_id'; // Khai báo khóa chính là user_id (mặc định Laravel tìm id)

    /**
     * Các trường được phép thêm dữ liệu (Mass Assignment)
     */
    protected $fillable = [
        'username', // Khớp với DB
        'email',
        'password',
        'avatar',
        'status',
        'role_id',
    ];

    /**
     * Các trường bị ẩn khi trả về JSON (bảo mật)
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}