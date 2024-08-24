import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdvancedSearch from "./AdvancedSearch";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import TasksTable from "./TasksTable";

export default function Index({ auth, projects, users}) {
  const [tasks, setTasks] = useState([]);
  const [queries, setQuery] = useState({
      show: 25,
      project_ids: [],
      from_task_page: true
  });

  const getTasks = async (query) => {
      await axios.post(route('task.fetch'), query ? query : queries)
      .then(res => {
          setTasks(res.data.tasks)
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <>
          <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <AdvancedSearch
              from_task_page={true}
              getTasks={getTasks}
              projects={projects}
              users={users}
              className='w-full'
            />
          </div>
            <Link
              href={route("task.create")}
              className="p-2 rounded-md bg-green-600 border border-green-700 text-white font-semibold hover:bg-green-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              Add New
            </Link>
          </div>
        </>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={[]}
                success={null}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
