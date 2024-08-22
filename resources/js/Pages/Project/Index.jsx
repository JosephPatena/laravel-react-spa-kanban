import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import Checkbox from "@/Components/Checkbox";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function Index({ auth, projects, copies, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };


  const [checkedItems, setCheckedItems] = useState(projects.data);

  // Function to handle individual checkbox click
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    var newCheckedItems = [];
    // Replace with your array of data IDs
    // Example: data.map(item => item.id)
    // Here 'data' should be the array of items you're rendering in the table
    checkedItems.forEach(item => {
      if (item.id == id) {
        item[item.id] = isChecked;
        newCheckedItems.push(item);
      } else {
        newCheckedItems.push(item);
      }
    });

    setCheckedItems(newCheckedItems);
  };

  // Function to handle "select all" checkbox click
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    // If "select all" is checked, mark all items as checked
    var newCheckedItems = [];
    // Replace with your array of data IDs
    // Example: data.map(item => item.id)
    // Here 'data' should be the array of items you're rendering in the table
    checkedItems.forEach(item => {
      item[item.id] = isChecked;
      newCheckedItems.push(item);
    });

    setCheckedItems(newCheckedItems);
  };

  const deleteAll = () => {
    var hasCheckedNone = true
    checkedItems.forEach(item => {
      if (item[item.id]) {
        hasCheckedNone = false;
      }
    });

    if (hasCheckedNone) {
      return alert('Please select item before proceeding');
    }

    if (!window.confirm("Are you sure you want to delete the selected the project/s?")) {
      return;
    }

    router.post(route('project.destroy_all', checkedItems));
  };

  const [forEdit, setForEditProject] = useState({});
  const [isModalShow, hideAndShowModal] = useState(false);

  const editProject = (project) => {
    var newProj = project
    hideAndShowModal(true);
    setForEditProject(newProj);
  };

  const pushUpdate = (column, update) => {
    forEdit[column] = update;
    setForEditProject(forEdit);
  };

  const saveProject = (event) => {
    event.preventDefault();
    router.put(route('project.update', forEdit.id), forEdit);
    hideAndShowModal(false);
  };

  const [inputValue, setInputValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (event) => {
    const column = event.target.name;
    const value = event.target.value;
    pushUpdate(column, value)

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      // Trigger your action here, for example:
      console.log(`User finished typing. Input value: ${value}`);
      
      // Replace the console.log with your action logic
    }, 1000)); // Adjust the delay (in milliseconds) as needed
  };

  useEffect(() => {
    // Clean up timeout on component unmount
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="px-3 py-3">Image</th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>
                      <th className="px-3 py-3">Created By</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="flex items-center justify-center text-center w-10">
                        <Checkbox className="mt-4" onChange={(e) => handleSelectAll(e)}></Checkbox>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                      >
                        <td className="flex items-center justify-center text-center">
                          <Checkbox className="mt-4" checked={checkedItems[index][project.id] || false} onChange={(e) => handleCheckboxChange(e, project.id)}></Checkbox>
                        </td>
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-2 text-nowrap hover:underline">
                          <Link href={route("project.show", project.id)}>
                            {project.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
