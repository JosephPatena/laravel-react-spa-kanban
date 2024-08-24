import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import AddTask from './Add';

export default function Create({ auth, projects, users }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <>
          <Link
            href={route("task.index")}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600 float-right"
          >
            Cancel
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Create New Task
            </h2>
          </div>
        </>
      }
    >
      <Head title="Create New Task" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white p-4 rounded-lg">
          <AddTask
            projects={projects}
            users={users}
          ></AddTask>
        </div>
      </div>
      
    </AuthenticatedLayout>
  );
}
