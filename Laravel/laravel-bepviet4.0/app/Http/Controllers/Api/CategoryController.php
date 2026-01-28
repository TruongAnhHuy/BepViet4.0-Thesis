<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories?type=meal
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->has('type')) {
            $query->where('category_type', $request->type);
        }

        return response()->json($query->get());
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $request->validate([
            'category_code' => 'required|unique:categories,category_code',
            'category_name' => 'required|string|max:100',
            'category_type' => 'required|string|max:50'
        ]);

        $category = Category::create($request->only([
            'category_code',
            'category_name',
            'category_type'
        ]));

        return response()->json($category, 201);
    }

    // PUT /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'category_code' => 'required|unique:categories,category_code,' . $id,
            'category_name' => 'required|string|max:100',
            'category_type' => 'required|string|max:50'
        ]);

        $category->update($request->only([
            'category_code',
            'category_name',
            'category_type'
        ]));

        return response()->json($category);
    }

    // DELETE /api/categories/{id}
    public function destroy($id)
    {
        Category::destroy($id);

        return response()->json([
            'message' => 'Xóa thành công'
        ]);
    }
}