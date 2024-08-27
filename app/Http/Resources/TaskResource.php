<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{

    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'start_date' => $this->start_date ? (new Carbon($this->start_date))->format('Y-m-d') : null,
            'complete_date' => $this->complete_date ? (new Carbon($this->complete_date))->format('Y-m-d') : null,
            'status' => $this->status,
            'priority' => $this->priority,
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->project),
            'assigned_user_id' => $this->assigned_user_id,
            'tester_user_id' => $this->tester_user_id,
            'reviewer_user_id' => $this->reviewer_user_id,
            'assignedUser' => new UserResource($this->assignedUser),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
