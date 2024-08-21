import React, { useContext, useEffect } from 'react'
import TaskList from './TaskList'
import { FaPlusCircle } from "react-icons/fa";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Index';
import toast from 'react-hot-toast';
import { router } from '@inertiajs/react';

function TasksContainer({ tasks, category, status, handleOpenModal, handleOpenTaskModal, getTasks }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => addItemToCategory(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addItemToCategory = async (item) => {
        try {
            if (item.category !== category) {
                const res = await router.put(route('kanban.category-update/', item.id), { category: category })

                getTasks()
                toast.success('Your task status has been updated')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div ref={drop} class={` flex-shrink-0 bg-gray-100 p-4 rounded-lg  ${isOver ? 'bg-slate-200' : 'bg-slate-50'}`}>
            <div class={`text-white text-center font-semibold py-2 rounded-t-lg bg-`+status.color+`-500`}>
                {status.title}
            </div>
            <div class="space-y-4 mt-4 overflow-y-auto custom-scrollbar max-h-screen">
                {tasks.length ? (tasks.map((task) => {
                    if (task.status === category) {
                        return <div key={task.id}>
                            <TaskList category={task.status} index={task.index} description={task.description} id={task.id} title={task.name} due_date={task.due_date} priority={task.priority} handleOpenTaskModal={handleOpenTaskModal} status={status} />
                        </div>
                    }
                })) : ''
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