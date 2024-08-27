import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
  auth,
  allTasks,
  totalPendingTasks,
  totalProgressTasks,
  totalTestingTasks,
  totalCompletedTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth ? auth.user : ''}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - All Tasks */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Tasks</h2>
              <p className="text-5xl font-bold text-gray-900">{allTasks}</p>
            </div>

            {/* Right Side - Other Task Statuses */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pending */}
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-800">{totalPendingTasks}</p>
              </div>

              {/* In Progress */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-blue-800">{totalProgressTasks}</p>
              </div>

              {/* Testing */}
              <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Testing</h3>
                <p className="text-3xl font-bold text-indigo-800">{totalTestingTasks}</p>
              </div>

              {/* Completed */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-green-800">{totalCompletedTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
