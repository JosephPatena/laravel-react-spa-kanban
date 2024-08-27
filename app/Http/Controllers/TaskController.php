<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Task/Index", [
            'projects' => ProjectResource::collection(Project::all()),
            'users' => UserResource::collection(User::all())
        ]);
    }

    public function fetch()
    {
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("keyword")) {
            $query->where("name", "like", "%" . request("keyword") . "%")
                ->orWhere("description", "like", "%" . request("keyword") . "%");
        }

        if (request('project_ids')) {
            $query->whereIn('project_id', request('project_ids'));
        }

        if (request('statuses')) {
            $query->whereIn('status', request('statuses'));
        }

        if (request('priorities')) {
            $query->whereIn('priority', request('priorities'));
        }

        if (request('assignees')) {
            $query->whereIn('assigned_user_id', request('assignees'));
        }

        if (request('testers')) {
            $query->whereIn('tester_user_id', request('testers'));
        }

        if (request('reviewers')) {
            $query->whereIn('reviewer_user_id', request('reviewers'));
        }

        if (request('start_date') || request('complete_date')) {
            $start = request('start_date') ?? Carbon::minValue();
            $end = request('complete_date') ?? Carbon::maxValue();

            $query->where(function($query) use ($start, $end) {
                $query->whereBetween('start_date', [$start, $end])
                    ->orWhereBetween('complete_date', [$start, $end])
                    ->orWhere(function($query) use ($start, $end) {
                        $query->where('start_date', '<=', $start)
                            ->where('complete_date', '>=', $end);
                    });
            });
        }

        if (request('from_task_page')) {
            $tasks = $query->orderBy($sortField, $sortDirection)
                            ->paginate(request('show'))
                            ->onEachSide(1);
        }
        else {
            $tasks = $query->latest()
                            ->limit(request('show'))
                            ->get()
                            ->reverse();
        }

        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $task = Task::create($data);

        if (request('from_task_page')) {
            return to_route('task.show', $task->id);
        }

        return response()->json([
            'task' => $task
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => TaskResource::make($task),
            'users' => UserResource::collection(User::all())
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        $task->update($data);

        return to_route('task.index')
            ->with('success', "Task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        return to_route('task.index')
            ->with('success', "Task \"$name\" was deleted");
    }
}
