import { router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

function AddTaskModal({ projects, getTasks, handleOpenModal, users, status='pending', priority='low', from_task_page }) {
    const [task, setTask] = useState({
        from_task_page: from_task_page,
        name: "",
        description: "",
        status: status,
        priority: priority,
        due_date: "",
        assigned_user_id: 0,
        tester_user_id: 0,
        reviewer_user_id: 0,
    })

    const handleChange = (e) => {
        setTask((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const [notifications, setNotifications] = useState([]);

    const typeClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };

    const handleAddTask = async () => {
        if (!getTasks) {
            return router.post(route('task.store'), task)
        }

        axios.post(route('task.store'), task)
        .then(res => {
            getTasks()
            handleOpenModal()
        })
        .catch(err => {
            setNotifications(err.response.data.errors)
        })
    }

    return (
        <>
            <div className="m-5">
                <h2 className="text-xl font-semibold mb-4">New Task</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Project
                        </label>
                        <select
                            key={'project_id'}
                            onChange={handleChange}
                            name="project_id"
                            className={`${notifications.project_id ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value=''>Select Project</option>
                            {
                                projects.data.map((project) => (
                                    <option value={project.id}>{project.name}</option>
                                ))
                            }
                        </select>
                        {
                            notifications.project_id &&
                            notifications.project_id.map((notification) => (
                                <small className='text-red-500'>{notification}</small>
                            ))
                        }
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            key={'name'}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            className={`${notifications.name ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {
                            notifications.name &&
                            notifications.name.map((notification) => (
                                <small className='text-red-500'>{notification}</small>
                            ))
                        }
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            key={'description'}
                            onChange={handleChange}
                            rows="4"
                            name="description"
                            className={`${notifications.description ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {
                            notifications.description &&
                            notifications.description.map((notification) => (
                                <small className='text-red-500'>{notification}</small>
                            ))
                        }
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Due Date
                        </label>
                        <input
                            key={'due_date'}
                            onChange={handleChange}
                            type="date"
                            name="due_date"
                            className={`${notifications.due_date ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {
                            notifications.due_date &&
                            notifications.due_date.map((notification) => (
                                <small className='text-red-500'>{notification}</small>
                            ))
                        }
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Status
                            </label>
                            <select
                                key={'status'}
                                defaultValue={status}
                                onChange={handleChange}
                                name="status"
                                className={`${notifications.status ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="testing">Testing</option>
                                <option value="completed">Completed</option>
                            </select>
                            {
                                notifications.status &&
                                notifications.status.map((notification) => (

                                    <small className='text-red-500'>{notification}</small>
                                ))
                            }
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Priority
                            </label>
                            <select
                                key={'priority'}
                                defaultValue={priority}
                                onChange={handleChange}
                                name="priority"
                                className={`${notifications.priority ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {
                                notifications.priority &&
                                notifications.priority.map((notification) => (

                                    <small className='text-red-500'>{notification}</small>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Assignee
                            </label>
                            <select
                                key={'assigned_user_id'}
                                onChange={handleChange}
                                name="assigned_user_id"
                                className={`${notifications.assigned_user_id ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value=''>Select Assignee</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                            {
                                notifications.assigned_user_id &&
                                notifications.assigned_user_id.map((notification) => (

                                    <small className='text-red-500'>{notification}</small>
                                ))
                            }
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Tester
                            </label>
                            <select
                                key={'tester_user_id'}
                                onChange={handleChange}
                                name="tester_user_id"
                                className={`${notifications.tester_user_id ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value=''>Select Tester</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                            {
                                notifications.tester_user_id &&
                                notifications.tester_user_id.map((notification) => (

                                    <small className='text-red-500'>{notification}</small>
                                ))
                            }
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Reviewer
                            </label>
                            <select
                                key={'reviewer_user_id'}
                                onChange={handleChange}
                                name="reviewer_user_id"
                                className={`${notifications.reviewer_user_id ? 'border-red-300': ''} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value=''>Select Reviewer</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                            {
                                notifications.reviewer_user_id &&
                                notifications.reviewer_user_id.map((notification) => (

                                    <small className='text-red-500'>{notification}</small>
                                ))
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="flex gap-2 mt-6">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleAddTask}
                    >
                        Save Task
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddTaskModal