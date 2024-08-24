<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class KanbanController extends Controller
{
    public function index()
    {
        return inertia("Kanban/Index", [
            'projects' => ProjectResource::collection(Project::all()),
            'users' => UserResource::collection(User::all())
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'task' => TaskResource::make(Task::find($id))
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        
    }

    public function updateStatus(Request $request)
    {
        $task = Task::find($request->id);
        $task->priority = $request->priority;
        $task->status = $request->status;
        $task->save();
        return response()->json([
            'message' => 'Successfully update!'
        ]);
    }

    public function destroy(Task $task)
    {

    }
}
