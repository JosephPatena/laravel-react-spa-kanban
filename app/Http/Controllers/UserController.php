<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCrudResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("User/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        if (request('redirect_not')) {
            return response()->json($user);
        }

        return to_route('user.show', $request->id);
    }

    public function fetch()
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("keyword")) {
            $query->where("name", "like", "%" . request("keyword") . "%")
                ->orWhere("email", "like", "%" . request("keyword") . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return UserResource::collection($users);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return inertia("User/Show", [
            'userData' => new UserResource(User::find($id))
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function view($id)
    {
        return response()->json([
            'user' => new UserResource(User::find($id))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return inertia('User/Edit', [
            'userData' => new UserResource(User::find($id)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $user)
    {
        User::find($user->id)->update($user->toArray());

        if (request('redirect_not')) {
            return response()->json($user);
        }

        return to_route('user.show', $user->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('user.index')
            ->with('success', "User \"$name\" was deleted");
    }
}
