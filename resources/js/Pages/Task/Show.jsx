import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from 'react';
import View from '@/Pages/Task/View';
export default function Show({ auth, id }) {
  const [users, setUsers] = useState([]);
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <View id={id} users={users}></View>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
