import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import React, { useContext, useEffect } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Index';
import toast from 'react-hot-toast';
import TaskList from './TaskList';
import axios from 'axios';

function TasksContainer({ tasks, category, priority, handleOpenModal, handleOpenTaskModal, getTasks, project_id }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => addItemToCategory(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addItemToCategory = async (item) => {
        if (item.category !== category || item.priority !== priority) {
            axios.post(route('kanban.category-update'), { id: item.id, category: category, priority: priority })
            .then(res => {
                getTasks(project_id)
                toast.success('Your task status has been updated')
            })
            .catch(err => {

            })
        }
    }

    return (
        <div ref={drop} class={` flex-shrink-0 bg-gray-100 p-4 rounded-lg  ${isOver ? 'bg-slate-200' : 'bg-slate-50'}`}>
            <div class={`text-white text-center font-semibold py-2 rounded-t-lg ${TASK_STATUS_CLASS_MAP[category]}`}>
                {TASK_STATUS_TEXT_MAP[category]}
            </div>
            <div class="space-y-4 mt-4 overflow-y-auto custom-scrollbar max-h-screen">
                {
                    tasks.map((task) => {
                        if (task.status === category && task.priority === priority) {
                            return <div key={task.id}>
                                <TaskList 
                                    category={task.status} 
                                    index={task.index} 
                                    description={task.description} 
                                    id={task.id} 
                                    title={task.name} 
                                    due_date={task.due_date} 
                                    priority={task.priority} 
                                    handleOpenTaskModal={handleOpenTaskModal} 
                                    assignedUser={task.assignedUser}
                                />
                            </div>
                        }
                    })
                }
            </div>
            <button onClick={() => handleOpenModal(category)} className='rounded w-full py-3 flex text-gray-500 items-center justify-center mt-5 bg-transparent gap-2 border-2 border-dashed border-gray-500'>
                <div className='text-xl'>
                    <FaPlusCircle />
                </div>
                <h1 className='font-semibold'>Add Task</h1>
            </button>
        </div>
    )
}

export default TasksContainer