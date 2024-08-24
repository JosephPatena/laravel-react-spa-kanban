import {TASK_BORDER_CLASS_MAP, PRIORITY_STATUS_BULLET_CLASS_MAP } from "@/constants.jsx";
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Index';

function TaskList({ task, handleOpenTaskModal }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: {
            id: task.id,
            status: task.status,
            priority: task.priority
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div class={`bg-white p-4 rounded-lg shadow ${isDragging ? "opacity-50" : "opacity-100"} border border-l-4 ${TASK_BORDER_CLASS_MAP[task.status]}`} ref={drag} key={task.id} onClick={() => handleOpenTaskModal(task)}>
            <div className="text-lg font-semibold text-gray-700">
                Task ID: {task.id}
            </div>
            <h3 class="font-medium text-gray-800">
                {task.name}
            </h3>
            <p class="text-sm text-gray-600">{task.description}</p>
            <div class="mt-4 flex justify-between text-sm">
                <div>
                    <p>
                        <span class="font-medium">Due Date:</span> <span class="text-gray-700">{task.due_date}</span>
                    </p>
                    <p>
                        <span class="font-medium">Priority:</span>
                        <span>
                            <span class={`inline-block w-3 h-3 rounded-full ml-2 mr-1 ${PRIORITY_STATUS_BULLET_CLASS_MAP[task.priority]}`}></span> 
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                    </p>
                </div>
                <div class="bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center float-right">
                    {task.assignedUser.initials}
                </div>
            </div>
        </div>
    )
}

export default TaskList