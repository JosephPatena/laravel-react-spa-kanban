import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ViewTask from './View';

export default function Show({ auth, task, users }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <>
          <Link
            href={route("task.index")}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600 float-right"
          >
            Back
          </Link>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              View Task
            </h2>
          </div>
        </>
      }
    >
      <Head title="View Task" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ViewTask task={task} users={users}></ViewTask>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
