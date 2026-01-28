<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{

public function profile(Request $request)
{
    $user = $request->user();
    
    // Nạp dữ liệu từ bảng user_profiles
    $user->load('profile'); 

    return response()->json([
        'id'       => $user->id,
        'username' => $user->username,
        'email'    => $user->email,
        'avatar'   => $user->profile?->avatar, // Lấy từ bảng profiles
        'phone'    => $user->profile?->phone,  // Lấy từ bảng profiles
    ]);
}
}