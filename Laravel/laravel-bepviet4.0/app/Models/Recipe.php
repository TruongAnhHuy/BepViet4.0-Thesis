<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = 'recipes';

    protected $primaryKey = 'recipe_id';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'cooking_time',
        'image_path',
    ];
}
