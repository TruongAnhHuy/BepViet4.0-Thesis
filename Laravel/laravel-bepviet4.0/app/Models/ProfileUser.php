<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class ProfileUser extends Model
{
    protected $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'avatar',
        'phone'
    ];
    public $timestamps = true;

    public function user(){
        return $this->belongsTo(User::class,'user_id','id');


    }
}