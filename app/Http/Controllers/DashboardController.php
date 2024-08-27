<?php

namespace App\Http\Controllers;

use App\Models\Task;

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

        $totalTestingTasks = Task::query()
            ->where('status', 'testing')
            ->count();
        
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();

        return inertia('Dashboard', [
            'allTasks' => $allTasks,
            'totalPendingTasks' => $totalPendingTasks,
            'totalProgressTasks' => $totalProgressTasks,
            'totalTestingTasks' => $totalTestingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
        ]);
    }
}
