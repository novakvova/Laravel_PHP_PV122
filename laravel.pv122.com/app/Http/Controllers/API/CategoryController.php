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
     *   security={{ "bearerAuth": {} }},
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
     *   security={{ "bearerAuth": {} }},
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

    function image_resize($width, $height, $path, $inputName)
    {
        list($w,$h)=getimagesize($_FILES[$inputName]['tmp_name']);
        $maxSize=0;
        if(($w>$h)and ($width>$height))
            $maxSize=$width;
        else
            $maxSize=$height;
        $width=$maxSize;
        $height=$maxSize;
        $ration_orig=$w/$h;
        if(1>$ration_orig)
            $width=ceil($height*$ration_orig);
        else
            $height=ceil($width/$ration_orig);
        //отримуємо файл
        $imgString=file_get_contents($_FILES[$inputName]['tmp_name']);
        $image=imagecreatefromstring($imgString);
        //нове зображення
        $tmp=imagecreatetruecolor($width,$height);
        imagecopyresampled($tmp, $image,
            0,0,
            0,0,
            $width, $height,
            $w, $h);
        //Зберегти зображення у файлову систему
        switch($_FILES[$inputName]['type'])
        {
            case 'image/jpeg':
                imagejpeg($tmp,$path,30);
                break;
            case 'image/png':
                imagepng($tmp,$path,0);
                break;
            case 'image/gif':
                imagegif($tmp, $path);
                break;
        }
        return $path;
        //очисчаємо память
        imagedestroy($image);
        imagedestroy($tmp);
    }
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

        $dir = $_SERVER['DOCUMENT_ROOT'];
        $fileSave = $dir.'/uploads/'.$filename;

        $this->image_resize(300,300,$fileSave, 'image');

        //Storage::disk('local')->put("public/uploads/".$filename,file_get_contents($request->file("image")));
        $input["image"] = $filename;
        //$file = $request->file('image');
        //$path = Storage::disk('public')->putFile('uploads', $file);

        $category = Category::create($input);
        return response()->json($category);
    }
}
