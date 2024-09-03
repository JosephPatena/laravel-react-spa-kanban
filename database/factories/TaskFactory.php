<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tester_user_id = null;
        $reviewer_user_id = null;
        $start_date = null;
        $complete_date = null;
        $status = fake()->randomElement(['pending', 'in_progress', 'testing', 'completed']);
        
        if ($status == 'testing' || $status == 'completed') {
            $tester_user_id = fake()->randomElement([1, 2]);
        }
        
        if ($status == 'completed') {
            $reviewer_user_id = fake()->randomElement([1, 2]);
            $complete_date = fake()->dateTimeBetween('-1 months', 'now');
        }
        
        if(in_array($status, ['in_progress', 'testing', 'completed'])) {
            $start_date = fake()->dateTimeBetween('-3 months', '-2 months');
        }

        $assigned_user_id = fake()->randomElement([1, 2, 3, 4]);
        
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 month'),
            'start_date' => $start_date,
            'complete_date' => $complete_date,
            'status' => $status,
            'priority' => fake()
                ->randomElement(['low', 'medium', 'high']),
            'assigned_user_id' => $assigned_user_id,
            'tester_user_id' => $tester_user_id,
            'reviewer_user_id' => $reviewer_user_id,
            'created_by' => $assigned_user_id,
            'updated_by' => $assigned_user_id,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
