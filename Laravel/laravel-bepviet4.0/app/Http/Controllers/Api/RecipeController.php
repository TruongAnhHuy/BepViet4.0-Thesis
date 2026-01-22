<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\BlogController;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
{
    $recipes = Recipe::all();
    
    // Cách 1: Trả về JSON chuẩn (React sẽ nhận được mảng [])
    return response()->json($recipes);
}
}
