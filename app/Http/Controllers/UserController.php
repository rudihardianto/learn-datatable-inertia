<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
   public function index(Request $request)
   {
      $request->validate([
         'field'     => 'in:id,name,email,created_at,updated_at',
         'direction' => 'in:asc,desc',
      ]);

      $query = User::query();
      if ($request->search) {
         $query->where('name', 'like', "%{$request->search}%")
            ->orWhere('email', 'like', "%{$request->search}%")
            ->orWhere('username', 'like', "%{$request->search}%");
      }

      if ($request->has(['field', 'direction'])) {
         $query->orderBy($request->field, $request->direction);
      }

      $users = new UserCollection($query->paginate($request->load ?? 10));

      return inertia('Users/Index', compact('users'));
   }
}