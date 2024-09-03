import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TasksTable from "@/Pages/Task/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from 'axios';

export default function Show({ userData }) {
  const [activeLink, setActiveLink] = useState(route('task.fetch'));
  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState({});

  const [queries, setQuery] = useState({
      show: 25,
      testers: [],
      statuses: [],
      reviewers: [],
      priorities: [],
      assignees: [userData.data.id],
      from_task_page: true,
      sort_direction: 'desc',
      sort_field : 'created_at',
  });

  const getTasks = async () => {
      await axios.post(activeLink, queries)
      .then(res => {
          setTasks(res.data.data)
          setLinks(res.data.meta.links)
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    setUser(userData.data);
  }, [])

  useEffect(() => {
    getTasks();
  }, [activeLink])


  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`User "${user.name}"`}
          </h2>
          <Link
            href={route('user.edit', userData.data.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <label className="font-bold text-lg">User ID</label>
                  <p className="mt-1">{user.id}</p>
                </div>
                <div className="mt-4">
                  
                  <label className="font-bold text-lg">Created Date</label>
                  <p className="mt-1">{user.created_at}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">User Email</label>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="font-bold text-lg">Is Verified</label>
                  <p className="mt-1">
                    {
                      user.email_verified_at &&
                      <span
                        className={
                          "px-2 py-1 rounded text-white bg-green-500"
                        }
                      >
                        Verified
                      </span>
                    }
                    {
                      !user.email_verified_at &&
                      <span
                        className={
                          "px-2 py-1 rounded text-white bg-amber-500"
                        }
                      >
                        Not Verified
                      </span>
                    }
                  </p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">User Name</label>
                  <p className="mt-1">{user.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                links={links}
                queries={queries}
                setQuery={setQuery}
                getTasks={getTasks}
                hideProjectColumn={true}
                setActiveLink={setActiveLink}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
