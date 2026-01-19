<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // --- SỬA ĐIỂM 1: KHÓA CHÍNH ---
    // Vì trong SQL cột là 'id', nên bạn hãy XÓA hoặc COMMENT dòng này đi
    // protected $primaryKey = 'user_id';  <-- XÓA DÒNG NÀY (Laravel mặc định hiểu là 'id')

    // --- SỬA ĐIỂM 2: FILLABLE ---
    // Phải có 'username' để khớp với SQL và Code React
    protected $fillable = [
        'username', // Quan trọng: Phải là username, không phải name
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

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}