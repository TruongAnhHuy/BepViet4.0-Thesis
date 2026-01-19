<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Đừng quên dòng này

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Lấy 5 chỉ số thống kê (Kiểm tra kỹ tên bảng)
        $stats = [
            'users'      => DB::table('users')->count(),
            'recipes'    => DB::table('recipes')->count(),
            // Lưu ý: Nếu bảng bài viết của bạn tên khác (vd: posts), hãy sửa 'blog_posts' thành tên đúng
            'posts'      => DB::table('blog_posts')->count(), 
            'categories' => DB::table('categories')->count(),
            'comments'   => DB::table('comments')->count(),
        ];

        // 2. Lấy dữ liệu biểu đồ tròn
        // SỬA LỖI QUAN TRỌNG: Đổi 'categories.name' thành 'categories.category_name'
        $chartData = DB::table('categories')
            ->join('recipe_category', 'categories.id', '=', 'recipe_category.category_id')
            ->select(
                'categories.category_name as name', // Đổi tên cột khi lấy ra để React hiểu
                DB::raw('count(recipe_category.recipe_id) as value')
            )
            ->groupBy('categories.id', 'categories.category_name') // Group by cũng phải đúng tên cột
            ->get();

        return response()->json([
            'counts' => $stats,
            'chart_data' => $chartData
        ]);
    }
}