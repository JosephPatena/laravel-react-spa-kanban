<?php

namespace App\Http\Controllers;

use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        
        $data = $this->fetchFigures();

        return inertia('Dashboard', [
            'allTasks' => $data['allTasks'],
            'totalPendingTasks' => $data['totalPendingTasks'],
            'totalProgressTasks' => $data['totalProgressTasks'],
            'totalTestingTasks' => $data['totalTestingTasks'],
            'totalCompletedTasks' => $data['totalCompletedTasks'],
        ]);
    }

    public function fetchFigures()
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

        return [
            'allTasks' => $allTasks,
            'totalPendingTasks' => $totalPendingTasks,
            'totalProgressTasks' => $totalProgressTasks,
            'totalTestingTasks' => $totalTestingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
        ];
    }
}
