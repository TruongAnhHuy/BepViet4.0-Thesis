<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // 1. Khai báo khóa chính (Vì trong SQL bạn đặt là user_id, không phải id)
    protected $primaryKey = 'user_id'; 

    // 2. Khai báo các cột được phép thêm dữ liệu (Mass Assignment)
    protected $fillable = [
        'username', // Sửa 'name' thành 'username'
        'email',
        'password',
        'avatar',
        'status',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            
        ];
    }
    public $timestamps = false; // Thêm dòng này vào Model nếu bạn xóa cột updated_at
}