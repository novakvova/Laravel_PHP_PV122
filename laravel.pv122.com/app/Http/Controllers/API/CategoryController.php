<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $list = Category::paginate(2);
        return response()->json($list,200);
    }

    public function store(Request $request)
    {
        //отримуємо дані із запиту(name, image, description)
        $input = $request->all();
        $category = Category::create($input);
        return response()->json($category);
    }
}
