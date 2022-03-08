<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public $loadDefault = 10;

   public function index(Request $request)
   {
      $query = User::query();
      if ($request->search) {
         $query->where('name', 'like', "%{$request->search}%")
            ->orWhere('email', 'like', "%{$request->search}%")
            ->orWhere('username', 'like', "%{$request->search}%");
      }

      $users = (
         UserResource::collection($query->paginate($request->load))
      )->additional([
         'attributes' => [
            'total'    => User::count(),
            'per_page' => 10,
         ],
         'filtered'   => [
            'load'   => $request->load ?? $this->loadDefault,
            'search' => $request->search ?? '',
            'page'   => $request->page ?? 1,
         ]]
      );

      return inertia('Users/Index', compact('users'));
   }
}