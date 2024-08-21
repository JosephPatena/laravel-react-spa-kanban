import React, { useContext, useState } from 'react'
import ModalLayout from './ModalLayout'
import toast from 'react-hot-toast'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { Bars } from 'react-loader-spinner'
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { router } from '@inertiajs/react'


function ShowTaskModal({ handleOpenTaskModal, id, category, getTasks, project_id }) {
    const [editMode, setEditMode] = useState(false)
    const [task, setTask] = useState({
        id: 0,
        name: "",
        description: "",
        category: "",
        index: 0,
    })
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)

    const handleEdit = () => {
        setEditMode(!editMode)
    }

    const handleDelete = async () => {
        if (confirm('Are you sure? This action cannot be undone.')) {
            try {
                const res = await router.delete(route('kanban.destroy', id))
    
                if (res.status === 200) {
                    toast.success('Task has been deleted')
                    handleOpenTaskModal()
                    getTasks(project_id)
                }
            } catch (error) {
                console.log(error);
        }
        }
    }

    const fetchDataById = async (id) => {
        try {
            axios.get(route('kanban.show', id))
            .then(res => {
                setTask((prev) => {
                    return { ...prev, ...res.data.task }
                })
            })
            .catch(err => {

            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {
            const res = await router.put(route('kanban.update', id), task)
            if (res.status === 200) {
                toast.success('Task has been updated')
                handleOpenTaskModal()
                getTasks(project_id)
            }
        } catch (error) {
            if (error.response.data.errors?.title) {
                toast.error(error.response.data.errors.title[0])
            }
            if (error.response.data.errors?.description) {
                toast.error(error.response.data.errors.description[0])
            }
        }
    }

    useState(() => {
        fetchDataById(id)
    }, [])

    return (
        <>
            {isOpenConfirmDelete && <ConfirmDeleteModal handleDeleteModal={handleDeleteModal}
                handleDelete={handleDelete} />}
            <ModalLayout handleOpenModal={handleOpenTaskModal}>
                {
                    editMode ?
                    (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                                        Title
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={task.name}
                                        id="title"
                                        type="text"
                                        name="name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        value={task.description}
                                        id="description"
                                        rows="4"
                                        name="description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">
                                        Due Date
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={task.due_date}
                                        id="dueDate"
                                        type="date"
                                        name="due_date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                                            Status
                                        </label>
                                        <select
                                            onChange={handleChange}
                                            value={task.status}
                                            id="status"
                                            name="status"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="testing">Testing</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                                            Priority
                                        </label>
                                        <select
                                            onChange={handleChange}
                                            value={task.priority}
                                            id="status"
                                            name="priority"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-6">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={handleEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) 
                    :
                    (
                        <>
                            <h2 className="text-xl font-semibold mb-4">{task.name}</h2>
                            <p className="text-gray-700 mb-4">{task.description}</p>
                            <div className=" mt-4">
                                <p className="text-sm text-gray-500">Due Date: {task.due_date}</p>
                                <p className="text-sm text-gray-500">Priority:&nbsp;
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-green-200 text-green-800`}>
                                        {task.priority}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500">Assigned To: {task.assignedUser ? task.assignedUser.name : ''}</p>
                            </div>
                            <div className="flex gap-2 mt-6">
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                                    onClick={handleOpenTaskModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm text-right"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )
                }
            </ModalLayout>
        </>
    )
}

export default ShowTaskModal