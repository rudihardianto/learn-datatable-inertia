<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
   public function index()
   {
      $users = UserResource::collection(User::paginate());

      return inertia('Users/Index', compact('users'));
   }
}