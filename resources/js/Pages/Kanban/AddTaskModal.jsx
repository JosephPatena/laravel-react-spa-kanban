import React, { useContext, useState } from 'react';
import ModalLayout from './ModalLayout';
import axios from 'axios';

function AddTaskModal({ handleOpenModal, category, getTasks, project_id, auth }) {
    const [data, setData] = useState({
        name: "",
        description: "",
        priority : "",
        status: category,
        project_id : project_id,
        assigned_user_id : auth.id
    })

    const handleChange = (e) => {
        setData((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const [notification, setNotification] = useState({
        isShow: false
    });

    const typeClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };

    const handleAddTask = async () => {
        try {
            axios.post(route('kanban.store'), data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                setNotification({
                    isShow: true,
                    type: typeClasses.error,
                    message: err.message
                })
            })
        } catch (error) {
        }
    }

    return (
        <>
            <ModalLayout handleOpenModal={handleOpenModal}>
                <div className="m-5">
                    {
                        notification.isShow &&
                        <div className={`py-2 mb-4 px-4 text-white rounded mb-41 `+ notification.type}>{notification.message}</div>
                    }
                    <h2 className="text-xl font-semibold mb-4">New Task</h2>
                    <div className="space-y-4">
                        <div className="flex-1">
                            <label htmlFor="Project" className="block text-gray-700 font-medium mb-1">
                                Project
                            </label>
                            <select
                                onChange={handleChange}
                                id="Project"
                                name="project_id"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="testing">Testing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                                Title
                            </label>
                            <input
                                onChange={handleChange}
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
                                id="description"
                                rows="4"
                                name="description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">
                                    Start Date
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="startDate"
                                    type="date"
                                    name="due_date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">
                                    Due Date
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="dueDate"
                                    type="date"
                                    name="due_date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="Assignee" className="block text-gray-700 font-medium mb-1">
                                    Assignee
                                </label>
                                <select
                                    onChange={handleChange}
                                    id="Assignee"
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
                                <label htmlFor="Tester" className="block text-gray-700 font-medium mb-1">
                                    Tester
                                </label>
                                <select
                                    onChange={handleChange}
                                    id="Tester"
                                    name="priority"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="Reviewer" className="block text-gray-700 font-medium mb-1">
                                    Reviewer
                                </label>
                                <select
                                    onChange={handleChange}
                                    id="Reviewer"
                                    name="priority"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                                    Status
                                </label>
                                <select
                                    onChange={handleChange}
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
                            onClick={handleAddTask}
                        >
                            Save
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={handleOpenModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default AddTaskModal