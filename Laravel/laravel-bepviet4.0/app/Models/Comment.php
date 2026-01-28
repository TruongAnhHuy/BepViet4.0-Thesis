<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Comment extends Model {
    protected $table = 'comments';
    protected $fillable = ['user_id', 'recipe_id', 'content', 'status'];

    // Bình luận thuộc về User
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}