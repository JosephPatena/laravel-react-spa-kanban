import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { useState, useEffect } from "react";

export default function Index({ auth }) {
  const [activeLink, setActiveLink] = useState(route('project.fetch'));
  const [success, setSuccesss] = useState(false);
  const [projects, setProjects] = useState([]);
  const [links, setLinks] = useState([]);

  const [queries, setQuery] = useState({
      show: 25,
      statuses: [],
      sort_direction: 'desc',
      from_project_page: true,
      sort_field : 'created_at',
  });

  const sortChanged = (name) => {
    handleQuery({
      sort_field: name,
      sort_direction: (queries.sort_direction=='desc' ? 'asc' : 'desc')
    })
  };

  const handleQuery = (query) => {
    setQuery((prev) => {
        return { ...prev, ...query }
    })
  }

  const getProjects = () => {
    axios.post(activeLink, queries)
    .then(res => {
        setProjects(res.data.data)
        setLinks(res.data.meta.links)
    })
    .catch(error => {
    });
  }

  useEffect(() => {
    getProjects();
  }, [activeLink, queries])

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
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="px-3 py-3">Image</th>
                      <TableHeading
                        name="name"
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>

                      <TableHeading
                        name="due_date"
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
                          placeholder="Project Name"
                          onChange={(e) =>
                            handleQuery({keyword: e.target.value})
                          }
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          onChange={(e) =>
                            handleQuery({statuses: [e.target.value]})
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
                    {projects.map((project, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={project.id}
                      >
                        <td className="flex items-center justify-center text-center">
                          {/* <Checkbox className="mt-4" checked={checkedItems[index][project.id] || false} onChange={(e) => handleCheckboxChange(e, project.id)}></Checkbox> */}
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
                        <td className="px-3 py-2">{project.createdBy ? project.createdBy.name : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav className="text-center mt-4">
              {
                links &&
                links.map((link) => (
                  <button
                    onClick={(e) => {
                      setActiveLink(link.url)
                    }}
                    preserveScroll
                    key={link.label}
                    className={
                      "inline-block py-2 px-3 rounded-lg text-dark-200 text-xs ml-1" +
                      (link.active ? "bg-gray-950 " : " ") +
                      (!link.url
                        ? "!text-gray-500 cursor-not-allowed "
                        : "hover:bg-gray-200")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  ></button>
                ))
              }
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
