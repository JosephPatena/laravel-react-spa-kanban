import React, { useState } from 'react';
import Select from 'react-select';

const AdvancedSearch = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  const handleSelect = (assignee) => {
    setSelectedAssignees(prev => 
      prev.includes(assignee) 
      ? prev.filter(item => item !== assignee)
      : [...prev, assignee]
    );
  };

  const assignees = [
    { id: 'john-smith', initials: 'JS', name: 'John Smith', color: 'bg-blue-500' },
    { id: 'alice-doe', initials: 'AD', name: 'Alice Doe', color: 'bg-green-500' },
    // Add more assignees as needed
  ];

  const projects = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
    { value: 'project3', label: 'Project 3' },
    // Add more projects as needed
  ];

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="flex-grow">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
            placeholder="Search tasks..."
          />
        </div>

        {/* Advanced Search Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showAdvanced ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Advanced Search Options */}
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Filter by Projects */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Projects</label>
                <Select
                options={projects}
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
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Start Date (Inclusive)</label>
                <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Filter by Date Finish */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Date Finish (Inclusive)</label>
                <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Filter by Assignee */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Assignee</label>
                <div className="flex flex-wrap">
                {assignees.map(({ id, initials, name, color }) => (
                    <div
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={`relative cursor-pointer flex items-center justify-center h-8 w-8 rounded-full ${color} text-white font-bold ${
                        selectedAssignees.includes(id) ? 'border-2 border-black' : ''
                    }`}
                    >
                    <div
                        className={`flex items-center justify-center h-full w-full rounded-full ${selectedAssignees.includes(id) ? 'border-2 border-blue-500' : ''}`}
                    >
                        {initials}
                    </div>
                    <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10"
                    >
                        {name}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Filter by Status */}
            <div>
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
            <div>
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
            <div>
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

            {/* Filter by Tester */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Tester</label>
                <div className="flex flex-wrap">
                {assignees.map(({ id, initials, name, color }) => (
                    <div
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={`relative cursor-pointer flex items-center justify-center h-8 w-8 rounded-full ${color} text-white font-bold ${
                        selectedAssignees.includes(id) ? 'border-2 border-black' : ''
                    }`}
                    >
                    <div
                        className={`flex items-center justify-center h-full w-full rounded-full ${selectedAssignees.includes(id) ? 'border-2 border-blue-500' : ''}`}
                    >
                        {initials}
                    </div>
                    <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1 bg-black text-white text-xs rounded-md p-1 z-10"
                    >
                        {name}
                    </div>
                    </div>
                ))}
                </div>
            </div>
            
            <div></div>
            <div></div>
            
            {/* Search Button */}
            <div className="col-span-1 sm:col-span-2">
                <button className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Search
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
