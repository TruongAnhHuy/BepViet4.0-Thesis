<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Bắt buộc phải có dòng này

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // 1. Thống kê số lượng (Lấy trực tiếp từ tên bảng trong Database)
            $stats = [
                'users'      => DB::table('users')->count(),
                'recipes'    => DB::table('recipes')->count(),
                'posts'      => DB::table('blog_posts')->count(), // Tên bảng là blog_posts
                'categories' => DB::table('categories')->count(),
                'comments'   => DB::table('comments')->count(),
            ];

            // 2. Biểu đồ (Sửa lại query cho đúng tên cột category_name)
            $chartData = DB::table('categories')
                ->join('recipe_category', 'categories.id', '=', 'recipe_category.category_id')
                ->select(
                    'categories.category_name as name', // Lấy cột category_name đổi tên thành name
                    DB::raw('count(recipe_category.recipe_id) as value')
                )
                ->groupBy('categories.id', 'categories.category_name')
                ->get();

            return response()->json([
                'status' => 200,
                'counts' => $stats,
                'chart_data' => $chartData
            ]);

        } catch (\Exception $e) {
            // Nếu lỗi, trả về thông báo chi tiết
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }
}