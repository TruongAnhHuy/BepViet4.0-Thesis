<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Bảng Role (Quyền hạn)
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // Tương ứng Role_id
            $table->string('role_name', 50);
            $table->timestamps();
        });

        // 2. Bảng Users (Người dùng)
        // Lưu ý: Nếu Laravel đã có sẵn bảng users, bạn cần chỉnh sửa file migration gốc hoặc drop bảng cũ
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Tương ứng User_id
            $table->string('username', 50);
            $table->string('email', 100)->unique();
            $table->string('password');
            $table->string('avatar')->nullable(); // Ảnh đại diện
            $table->tinyInteger('status')->default(1); // 1: Active, 0: Block
            $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null'); // Liên kết quyền
            $table->timestamps(); // Bao gồm created_at
        });

        // 3. Bảng User_Profile (Thông tin chi tiết)
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id(); // Profile_id
            $table->string('avatar')->nullable(); // Có thể thừa nếu bảng users đã có, nhưng mình giữ theo file
            $table->string('phone', 15)->nullable();
            $table->timestamps();
        });

        // 4. Bảng Categories (Danh mục món ăn)
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Category_id
            $table->string('category_name', 100);
            $table->timestamps();
        });

        // 5. Bảng Ingredients (Nguyên liệu)
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id(); // Ingredient_id
            $table->string('ingredient_name', 100);
            $table->timestamps();
        });

        // 6. Bảng Recipes (Công thức nấu ăn)
        Schema::create('recipes', function (Blueprint $table) {
            $table->id(); // Recipe_id
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Người đăng
            $table->string('title', 150);
            $table->text('description')->nullable();
            $table->integer('cooking_time')->nullable(); // Thời gian nấu (phút)
            $table->string('image_path')->nullable();
            $table->timestamps(); // created_at
        });

        // 7. Bảng Recipe_Ingredient (Pivot: Công thức - Nguyên liệu)
        Schema::create('recipe_ingredient', function (Blueprint $table) {
            // Khóa chính phức hợp
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            $table->foreignId('ingredient_id')->constrained('ingredients')->onDelete('cascade');
            $table->float('quantity');
            $table->string('unit', 20); // Đơn vị: gram, muỗng, cái...
            $table->primary(['recipe_id', 'ingredient_id']);
        });

        // 8. Bảng Recipe_Category (Pivot: Công thức - Danh mục)
        Schema::create('recipe_category', function (Blueprint $table) {
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->text('content')->nullable(); // Ghi chú thêm nếu có
            $table->primary(['recipe_id', 'category_id']);
        });

        // 9. Bảng Cooking_Step (Các bước nấu)
        Schema::create('cooking_steps', function (Blueprint $table) {
            $table->id(); // Step_id
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            $table->integer('step_number');
            $table->text('content');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // 10. Bảng BlogPosts (Bài viết chia sẻ)
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id(); // Post_id
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title', 200);
            $table->longText('content');
            $table->tinyInteger('status')->default(0); // 0: Nháp, 1: Public
            $table->timestamps();
        });

        // 11. Bảng Comments (Bình luận - Dùng cho cả Recipe và Blog)
        Schema::create('comments', function (Blueprint $table) {
            $table->id(); // Comment_id
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Bình luận có thể thuộc về Recipe HOẶC Blog, nên để nullable
            $table->foreignId('recipe_id')->nullable()->constrained('recipes')->onDelete('cascade');
            $table->foreignId('blog_id')->nullable()->constrained('blog_posts')->onDelete('cascade'); // Sửa tên bảng tham chiếu cho đúng
            $table->text('content');
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        // 12. Bảng Interactions (Tương tác: Like, Save...)
        Schema::create('interactions', function (Blueprint $table) {
            $table->id(); // Interaction_id
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            $table->string('type', 20); // Ví dụ: 'like', 'save', 'rate'
            $table->timestamps();
        });

        // 13. Bảng Moderation (Kiểm duyệt)
        Schema::create('moderations', function (Blueprint $table) {
            $table->id(); // Moderation_id
            $table->unsignedBigInteger('content_id'); // ID của bài viết hoặc công thức
            $table->string('content_type', 50); // Loại: 'recipe' hoặc 'blog_post'
            $table->foreignId('admin_id')->constrained('users'); // Người duyệt
            $table->string('status', 20); // 'approved', 'rejected'
            $table->dateTime('approved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Xóa bảng theo thứ tự ngược lại để tránh lỗi khóa ngoại
        Schema::dropIfExists('moderations');
        Schema::dropIfExists('interactions');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('cooking_steps');
        Schema::dropIfExists('recipe_category');
        Schema::dropIfExists('recipe_ingredient');
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('ingredients');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
    }
};