import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Index'

function TaskList({ category, id, title, description, index, handleOpenTaskModal, status, due_date, priority }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: {
            id: id,
            category: category
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div class={`bg-white p-4 rounded-lg shadow ${isDragging ? "opacity-50" : "opacity-100"} border border-l-4 border-l-`+status.color+`-500`} ref={drag} key={id} onClick={() => handleOpenTaskModal(category, id)}>
            <h3 class="font-medium text-gray-800">{title}</h3>
            <p class="text-sm text-gray-600">{description}</p>
            <div class="mt-4 flex justify-between text-sm">
                <div class="due-date">
                    <span class="font-medium">Due Date:</span> <span class="text-gray-700">{due_date}</span>
                </div>
                <div class="priority">
                    <span class="font-medium">Priority:</span> <span class="text-gray-700">{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskList