<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BlogPost extends Model
{
    use HasFactory;

    protected $table = 'blog_posts'; 

    // QUAN TRỌNG: Phải có 'image_path' ở đây
    protected $fillable = ['user_id', 'title', 'content', 'status', 'image_path'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}