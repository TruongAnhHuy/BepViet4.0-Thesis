<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json([
            ['id'=>1,'name'=>'Bún bò Huế','image'=>'bunbo.jpg'],
            ['id'=>2,'name'=>'Phở bò','image'=>'pho.jpg'],
            ['id'=>3,'name'=>'Bánh xèo','image'=>'banhxeo.jpg'],
        ]);
    }
}

