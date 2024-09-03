import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Index';
import TaskList from './TaskList';
import axios from 'axios';

function TasksContainer({ tasks, status, priority, handleOpenModal, handleOpenTaskModal, getTasks }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item) => updateStatus(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const updateStatus = async (item) => {
        if (item.status !== status || item.priority !== priority) {
            axios.put(route('kanban.update', item.id), { status: status, priority: priority })
            .then(res => {
                getTasks()
            })
            .catch(err => {

            })
        }
    }

    return (
        <div ref={drop} class={` flex-shrink-0 bg-gray-100 p-4 rounded-lg  ${isOver ? 'bg-slate-200' : 'bg-slate-50'}`}>
            <div class={`text-white text-center font-semibold py-2 rounded-t-lg ${TASK_STATUS_CLASS_MAP[status]}`}>
                {TASK_STATUS_TEXT_MAP[status]}
            </div>
            <div class="space-y-4 mt-4 overflow-y-auto custom-scrollbar max-h-screen">
                {
                    tasks.map((task) => {
                        if (task.status === status && task.priority === priority) {
                            return <div key={task.id}>
                                <TaskList 
                                    task={task}
                                    handleOpenTaskModal={handleOpenTaskModal}
                                />
                            </div>
                        }
                    })
                }
            </div>
            <button onClick={() => handleOpenModal(status, priority)} className='rounded w-full py-3 flex text-gray-500 items-center justify-center mt-5 bg-transparent gap-2 border-2 border-dashed border-gray-500'>
                <div className='text-xl'>
                    <FaPlusCircle />
                </div>
                <h1 className='font-semibold'>Add Task</h1>
            </button>
        </div>
    )
}

export default TasksContainer