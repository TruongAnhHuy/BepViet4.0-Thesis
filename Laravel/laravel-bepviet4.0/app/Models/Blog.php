<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blogs';

    protected $primaryKey = 'blog_id';

    protected $fillable = [
        'post_id',
        'user_id',
        'title',
        'content',
        'status',
        'created_at',
        'updated_at',
    ];
}
