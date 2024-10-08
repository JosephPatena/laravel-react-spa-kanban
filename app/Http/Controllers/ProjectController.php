<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Project/Index");
    }

    public function fetch()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("keyword")) {
            $query->where("name", "like", "%" . request("keyword") . "%")
                ->orWhere("description", "like", "%" . request("keyword") . "%");
        }

        if (request('statuses') && !empty(request('statuses')[0])) {
            $query->whereIn('status', request('statuses'));
        }

        if (request('from_project_page')) {
            $projects = $query->orderBy($sortField, $sortDirection)
                            ->paginate(request('show'))
                            ->onEachSide(1);
        }
        else {
            $projects = $query->latest()
                            ->limit(request('show'))
                            ->get()
                            ->reverse();
        }

        return ProjectResource::collection($projects);
    }

    public function fetchSingleRecord($id)
    {
        return response()->json([
            'project' => ProjectResource::make(Project::find($id))
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $project = Project::create($data);

        if (request('redirect_not')) {
            return response()->json($project);
        }

        return to_route('project.show', $project->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia('Project/Show', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $project)
    {
        Project::find($project->id)->update($project->toArray());

        if (request('redirect_not')) {
            return response()->json($project);
        }

        return to_route('project.show', $project->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->delete();
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')
            ->with('success', "Project \"$name\" was deleted");
    }

    public function destroyAll()
    {
        foreach(request()->all() as $project_id => $selected) {
            if (is_numeric($project_id) && (bool) $selected) {
                self::destroy(Project::find($project_id));
            }
        }
    }
}
