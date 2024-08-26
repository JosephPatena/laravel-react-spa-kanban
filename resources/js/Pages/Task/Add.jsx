import { useState } from 'react';
import axios from 'axios';

function AddTaskModal({ projects, getTasks, handleOpenModal, users, status, priority, from_task_page }) {
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
        try {
            axios.post(route('kanban.store'), task)
            .then(res => {
                console.log(res)
                // if (res.status !== 200) {
                //     setNotification({
                //         isShow: true,
                //         type: typeClasses.error,
                //         message: res.message
                //     })
                // } else {
                //     if (getTasks) {
                //         getTasks()
                //         handleOpenModal()
                //     } else {
                //         Inertia.visit(route('task.show', res.data.task.id));
                //     }
                // }
            })
            .catch(err => {
                setNotifications(err.response.data.errors)
            })
        } catch (error) {
        }
    }

    return (
        <>
            <div className="m-5">
                {
                    notifications.length && notifications.map((notification) => {
                        // return <div className={`py-2 mb-4 px-4 rounded mb-41 `+ typeClasses.error}>{notification}</div>
                    })
                }
                <h2 className="text-xl font-semibold mb-4">New Task</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Project
                        </label>
                        <select
                            onChange={handleChange}
                            name="project_id"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value=''>Select Project</option>
                            {
                                projects.data.map((project) => (
                                    <option value={project.id}>{project.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Title
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            onChange={handleChange}
                            rows="4"
                            name="description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Due Date
                        </label>
                        <input
                            onChange={handleChange}
                            type="date"
                            name="due_date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Status
                            </label>
                            <select
                                defaultValue={status}
                                onChange={handleChange}
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
                            <label className="block text-gray-700 font-medium mb-1">
                                Priority
                            </label>
                            <select
                                defaultValue={priority}
                                onChange={handleChange}
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
                            <label className="block text-gray-700 font-medium mb-1">
                                Assignee
                            </label>
                            <select
                                onChange={handleChange}
                                name="assigned_user_id"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value=''>Select Assignee</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Tester
                            </label>
                            <select
                                onChange={handleChange}
                                name="tester_user_id"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value=''>Select Tester</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1">
                                Reviewer
                            </label>
                            <select
                                onChange={handleChange}
                                name="reviewer_user_id"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value=''>Select Reviewer</option>
                                {
                                    users.data.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
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