<?php

namespace App\Http\Controllers;

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

    public function update($id)
    {
        $task = Task::find($id);

        if (request('column') && request('value')) {
            $task->update([
                request('column') => request('value')
            ]);
        }

        if (request('priority') && request('status')) {
            $task->update([
                'priority' => request('priority'),
                'status' => request('status'),
            ]);
        }

        return response()->json([
            'task' => $task
        ], 200);
    }
}
