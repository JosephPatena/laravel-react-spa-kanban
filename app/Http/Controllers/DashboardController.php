<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        
        $allTasks = Task::count();

        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        
        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();

        $query = Task::query();
        
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Dashboard', [
            'allTasks' => $allTasks,
            'totalPendingTasks' => $totalPendingTasks,
            'totalProgressTasks' => $totalProgressTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
