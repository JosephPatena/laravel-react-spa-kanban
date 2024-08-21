<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class KanbanController extends Controller
{
    public function index()
    {
        return inertia("Kanban/Index");
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

    public function updateCategory(Request $request, $id)
    {
        
    }

    public function destroy(Task $task)
    {

    }
}
