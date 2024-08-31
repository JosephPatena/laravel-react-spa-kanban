import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import TableHeading from "@/Components/TableHeading";
import { useState, useEffect } from 'react';
import { Link } from "@inertiajs/react";

export default function TasksTable({
  tasks,
  links,
  queries,
  setQuery,
  getTasks,
  setActiveLink,
  hideProjectColumn = false,
}) {
  const [success, setSuccesss] = useState(false);

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

  useEffect(() => {
    getTasks();
  }, [queries])

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              {!hideProjectColumn && (
                <th className="px-3 py-3">Project Name</th>
              )}
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
          <tbody>
            {tasks.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-3 py-2">{task.id}</td>
                {!hideProjectColumn && (
                  <td className="px-3 py-2">{task.project.name}</td>
                )}
                <th className="px-3 py-2 hover:underline">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
                </th>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy ? task.createdBy.name : ''}</td>
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
    </>
  );
}
