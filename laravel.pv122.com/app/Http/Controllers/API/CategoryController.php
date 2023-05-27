<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Storage;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         ),
     *         description="Page number default 1"
     *     ),
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function index()
    {
        $list = Category::paginate(2);
        return response()->json($list,200);
    }


    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function store(Request $request)
    {
        //отримуємо дані із запиту(name, image, description)
        $input = $request->all();
        $messages = array(
            'name.required' => 'Вкажіть назву категорії!',
            'description.required' => 'Вкажіть опис категорії!',
            'image.required' => 'Оберіть фото категорії!'
        );
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        //php artisan storage:link
        $filename = uniqid(). '.' .$request->file("image")->getClientOriginalExtension();
        Storage::disk('local')->put("public/uploads/".$filename,file_get_contents($request->file("image")));
        $input["image"] = $filename;
        //$file = $request->file('image');
        //$path = Storage::disk('public')->putFile('uploads', $file);

        $category = Category::create($input);
        return response()->json($category);
    }
}
