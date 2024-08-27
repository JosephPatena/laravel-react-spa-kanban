import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

function TaskView({ task, users, getTasks }) {
    
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleSave = (event) => {
        const column = event.target.name;
        const value = event.target.value;
        axios.patch(route('kanban.update', task.id), {
            column: column,
            value: value,
        })
        .then(res => {
            if (getTasks) {
                getTasks()
            }
        })
        .catch(err => {})
    }
    
    const handleChange = (event) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    
        setTypingTimeout(setTimeout(() => {
            handleSave(event)
        }, 1000));
    };
    
    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    return (
        <>
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
                {/* Left Side - Task Details */}
                <div className="w-full md:w-2/3 p-6 border-r border-gray-200">
                    {/* Top Section with Task ID */}
                    <div className="flex justify-between items-center mb-3">
                        {/* Task ID */}
                        <div className="text-lg font-semibold text-gray-700">
                            <Link href={route("task.show", task.id)}>Task ID: {task.id}</Link>
                        </div>
                    </div>

                    {/* Title */}
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="text-2xl font-extrabold text-gray-900 mb-3 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        defaultValue={task.name}
                    />

                    {/* Description */}
                    <textarea
                        className="text-base text-gray-700 mb-4 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        name="description"
                        onChange={handleChange}
                        defaultValue={task.description}
                    ></textarea>

                    <p className="text-amber-500 mb-5">
                        <small>
                            Note:
                            <i>The elements below don't have functionality yet. They are intended for future development.</i>
                        </small>
                    </p>

                    {/* Checklist */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Checklist</h3>
                        <ul className="list-none space-y-1">
                            <li className="flex items-center text-base text-gray-700">
                                <input
                                    type="checkbox"
                                    id="item-1"
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={(e) => {
                                        const label = e.target.nextElementSibling;
                                        label.classList.toggle('line-through');
                                        label.classList.toggle('text-gray-400');
                                    }}
                                    checked={true}
                                />
                                <label htmlFor="item-1" className="cursor-pointer text-gray-400 line-through">
                                    This is an existing checklist 1.
                                </label>
                            </li>
                            <li className="flex items-center text-base text-gray-700">
                                <input
                                    type="checkbox"
                                    id="item-2"
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={(e) => {
                                        const label = e.target.nextElementSibling;
                                        label.classList.toggle('line-through');
                                        label.classList.toggle('text-gray-400');
                                    }}
                                />
                                <label htmlFor="item-2" className="cursor-pointer">
                                    This is an existing checklist 2.
                                </label>
                            </li>
                            <li className="flex items-center text-base text-gray-700">
                                <input
                                    type="checkbox"
                                    id="item-3"
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={(e) => {
                                        const label = e.target.nextElementSibling;
                                        label.classList.toggle('line-through');
                                        label.classList.toggle('text-gray-400');
                                    }}
                                />
                                <label htmlFor="item-3" className="cursor-pointer">
                                    This is an existing checklist 3.
                                </label>
                            </li>
                            {/* Add more checklist items dynamically */}
                        </ul>
                    </div>

                    {/* Attachments */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Attachments</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Example File 1 */}
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center justify-center h-20 w-full border border-gray-300 rounded-lg bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div className="mt-1 text-xs text-gray-600">file1.pdf</div>
                                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-150"></div>
                            </div>

                            {/* Example File 2 */}
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center justify-center h-20 w-full border border-gray-300 rounded-lg bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div className="mt-1 text-xs text-gray-600">image1.png</div>
                                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-150"></div>
                            </div>

                            {/* Example File 3 */}
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center justify-center h-20 w-full border border-gray-300 rounded-lg bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div className="mt-1 text-xs text-gray-600">doc1.docx</div>
                                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-150"></div>
                            </div>

                            {/* Add more files dynamically */}
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
                        <textarea
                            className="w-full h-20 p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a comment..."
                        ></textarea>
                    </div>

                    {/* Existing Comments Example */}
                    <div className="mt-4">
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-900">John Doe</p>
                            <p className="text-sm text-gray-700">This is an existing comment. It provides feedback on the task.</p>
                            <p className="text-xs text-gray-500">2024-08-21 14:30</p>
                        </div>

                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-900">Jane Smith</p>
                            <p className="text-sm text-gray-700">Another comment with some additional details.</p>
                            <p className="text-xs text-gray-500">2024-08-22 09:15</p>
                        </div>

                        {/* Add more existing comments dynamically */}
                    </div>

                </div>

                {/* Right Side - Additional Details */}
                <div className="w-full md:w-1/3 p-6 bg-gray-200">
                    {/* Watchers */}
                    <p className="text-sm font-semibold text-gray-600 mb-1">Watchers:</p>
                    <div className="flex mb-4">
                        <div className="relative group">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold">
                                JS
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10 w-max whitespace-nowrap">
                                John Smith
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white font-bold">
                                AD
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10 w-max whitespace-nowrap">
                                Alice Doe
                            </div>
                        </div>
                        {/* Add more watchers dynamically */}
                    </div>
                    <div className="mb-4">
                        {/* Status */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Status:</p>
                        <select
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="status"
                            onChange={handleSave}
                            defaultValue={task.status}
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="testing">Testing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        {/* Priority */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Priority:</p>
                        <select
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="priority"
                            onChange={handleSave}
                            defaultValue={task.priority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        {/* Due Date */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Due Date:</p>
                        <input
                            type="date"
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="due_date"
                            onChange={handleSave}
                            defaultValue={task.due_date}
                        />
                    </div>

                    <div className="mb-4">
                        {/* Start Date */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Start Date:</p>
                        <input
                            type="date"
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="start_date"
                            onChange={handleSave}
                            defaultValue={task.start_date}
                        />
                    </div>

                    <div className="mb-4">
                        {/* Assignee */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Assignee:</p>
                        <select
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="assigned_user_id"
                            onChange={handleSave}
                            defaultValue={task.assigned_user_id}
                        >
                            {
                                users.data.map((user, key) => (
                                    <option key={key} value={user.id}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        {/* Tester */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tester:</p>
                        <select
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="tester_user_id"
                            onChange={handleSave}
                            defaultValue={task.tester_user_id}
                        >
                            {
                                users.data.map((user, key) => (
                                    <option key={key} value={user.id}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        {/* Reviewer */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Reviewer:</p>
                        <select
                            className="text-base text-gray-800 bg-white p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 border-0"
                            name="reviewer_user_id"
                            onChange={handleSave}
                            defaultValue={task.reviewer_user_id}
                        >
                            {
                                users.data.map((user, key) => (
                                    <option key={key} value={user.id}>{user.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        {/* Tags */}
                        <p className="text-sm font-semibold text-gray-600 mb-1">Tags:</p>
                        <div className="flex flex-wrap space-x-2 mb-1">
                            <input
                                readOnly
                                type="text"
                                className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full focus:ring-2 focus:ring-blue-500"
                                defaultValue="Frontend"
                            />
                            {/* Display multiple tags dynamically */}
                        </div>
                        <div className="flex flex-wrap space-x-2 mb-1">
                            <input
                                readOnly
                                type="text"
                                className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full focus:ring-2 focus:ring-blue-500"
                                defaultValue="Backend"
                            />
                            {/* Display multiple tags dynamically */}
                        </div>
                        <div className="flex flex-wrap space-x-2 mb-1">
                            <input
                                readOnly
                                type="text"
                                className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full focus:ring-2 focus:ring-blue-500"
                                defaultValue="Design"
                            />
                            {/* Display multiple tags dynamically */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskView