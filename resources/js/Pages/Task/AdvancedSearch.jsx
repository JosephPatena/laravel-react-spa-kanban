import { useState, useEffect } from 'react';
import Select from 'react-select';

function AdvancedSearch({getTasks, projects, users, setQuery}) {
    const [selectedAssignees, setSelectedAssignees] = useState([]);
    const [selectedReviewers, setSelectedReviewers] = useState([]);
    const [selectedTesters, setSelectedTesters] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [projectsData, constructProjects] = useState([]);

    const handleSelectAssignee = (user) => {
        setSelectedAssignees(prev => 
            prev.includes(user) 
            ? prev.filter(item => item !== user)
            : [...prev, user]
        );
    };
    
    const handleSelectTester = (user) => {
        setSelectedTesters(prev => 
            prev.includes(user) 
            ? prev.filter(item => item !== user)
            : [...prev, user]
        );
    };

    const handleSelectReviewer = (user) => {
        setSelectedReviewers(prev => 
            prev.includes(user) 
            ? prev.filter(item => item !== user)
            : [...prev, user]
        );
    };

    const handleQuery = (query) => {
        setQuery((prev) => {
            return { ...prev, ...query }
        })
    }

    const handleProjectIDs = (selected_projects) => {
        var project_ids = [];
        selected_projects.forEach((project) => {
            project_ids.push(project.value);
        });
        handleQuery({project_ids:project_ids});
    }

    const handleSearch = () => {
        getTasks()
    }

    useEffect(() => {
        var projs = [];
        projects.data.forEach((project) => {
            projs.push({
                value: project.id,
                label: project.name
            });
        });
        constructProjects(projs);

    }, [])

    return (
        <div className="bg-white rounded-lg">
        <div className="flex items-center">
            {/* Search Input */}
            <div className="flex-grow">
            <input
                type="text"
                className="w-full p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Search tasks..."
            />
            </div>

            {/* Advanced Search Button */}
            <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="p-2 rounded-r-md bg-blue-600 border border-blue-700 text-white font-semibold hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
            {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
        </div>

        {/* Advanced Search Options */}
        {showAdvanced && (
            <div className="mt-4 text-sm">
                <div className='flex gap-4'>
                    {/* Filter by Projects */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Projects</label>
                        <Select
                            onChange={(element) => {
                                handleProjectIDs(element)
                            }}
                            options={projectsData}
                            isMulti
                            placeholder="Select projects..."
                            className="react-select-container"
                            classNamePrefix="react-select"
                            styles={{
                                control: (provided) => ({
                                ...provided,
                                borderColor: '#D1D5DB',
                                boxShadow: 'none',
                                '&:hover': {
                                    borderColor: '#3B82F6',
                                },
                                }),
                                menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                                }),
                                multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: '#E0F2FE',
                                }),
                                multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#3B82F6',
                                }),
                                multiValueRemove: (provided) => ({
                                ...provided,
                                color: '#3B82F6',
                                ':hover': {
                                    backgroundColor: '#FEE2E2',
                                    color: '#EF4444',
                                },
                                }),
                            }}
                        />
                    </div>

                    {/* Filter by Start Date */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Date Started (Inclusive)</label>
                        <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>

                    {/* Filter by Date Finish */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Date Completed (Inclusive)</label>
                        <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>

                    {/* Filter by Assignee */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Assignee</label>
                        <div className="flex flex-wrap">
                        {
                            users.data.map(({ id, initials, name }) => (
                                <div
                                    key={id}
                                    onClick={() => handleSelectAssignee(id)}
                                    className={`relative cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white font-bold ${
                                        selectedAssignees.includes(id) ? 'border-2 border-black' : ''
                                    } group`}
                                >
                                    <div
                                        className={`flex items-center justify-center h-full w-full rounded-full ${selectedAssignees.includes(id) ? 'border-2 border-gray-500' : ''}`}
                                    >
                                        {initials}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10 w-max whitespace-nowrap"
                                    >
                                        {name}
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>

                <div className='flex gap-4'>
                    {/* Filter by Projects */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Show</label>
                        <select
                            onChange={(e) => {
                                handleQuery({show:e.target.value})
                            }}
                            defaultValue={25}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="400">400</option>
                            <option value="600">600</option>
                            <option value="800">800</option>
                            <option value={Number.MAX_SAFE_INTEGER}>All</option>
                        </select>
                    </div>

                    {/* Filter by Start Date */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">After Due Date (Inclusive)</label>
                        <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>

                    {/* Filter by Date Finish */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Before Due Date (Inclusive)</label>
                        <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>

                    {/* Filter by Tester */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Tester</label>
                        <div className="flex flex-wrap">
                        {
                            users.data.map(({ id, initials, name }) => (
                                <div
                                    key={id}
                                    onClick={() => handleSelectTester(id)}
                                    className={`relative cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white font-bold ${
                                        selectedTesters.includes(id) ? 'border-2 border-black' : ''
                                    } group`}
                                >
                                    <div
                                        className={`flex items-center justify-center h-full w-full rounded-full ${selectedTesters.includes(id) ? 'border-2 border-gray-500' : ''}`}
                                    >
                                        {initials}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10 w-max whitespace-nowrap"
                                    >
                                        {name}
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>

                <div className='flex gap-4'>
                    {/* Filter by Status */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Status</label>
                        <div className="space-y-1">
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Pending</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>In Progress</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Testing</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Completed</span>
                        </label>
                        </div>
                    </div>

                    {/* Filter by Priority */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Priority</label>
                        <div className="space-y-1">
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Low</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Medium</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>High</span>
                        </label>
                        </div>
                    </div>

                    {/* Filter by Tags */}
                    <div className='flex-1 mt-2'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Tags</label>
                        <div className="space-y-1">
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Frontend</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Backend</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>Design</span>
                        </label>
                        </div>
                    </div>

                    {/* Filter by Reviewer */}
                    <div className='flex-1'>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Reviewer</label>
                        <div className="flex flex-wrap">
                        {
                            users.data.map(({ id, initials, name }) => (
                                <div
                                    key={id}
                                    onClick={() => handleSelectReviewer(id)}
                                    className={`relative cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-gray-500 text-white font-bold ${
                                        selectedReviewers.includes(id) ? 'border-2 border-black' : ''
                                    } group`}
                                >
                                    <div
                                        className={`flex items-center justify-center h-full w-full rounded-full ${selectedReviewers.includes(id) ? 'border-2 border-gray-500' : ''}`}
                                    >
                                        {initials}
                                    </div>
                                    <div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10 w-max whitespace-nowrap"
                                    >
                                        {name}
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>

                <div className='flex fap-4'>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    <div className='flex-1'></div>
                    {/* Search Button */}
                    <div className="flex-1">
                        <button onClick={() => handleSearch()} className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Search
                        </button>
                    </div>
                </div>
                
            </div>
        )}
        </div>
    );
};

export default AdvancedSearch;
