import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { useState, useEffect } from "react";
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function Index() {
  document.title = "Users - React";

  const [activeLink, setActiveLink] = useState(route('user.fetch'));
  const [success, setSuccesss] = useState(false);
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);

  const [queries, setQuery] = useState({
      show: 25,
      keyword: '',
      sort_direction: 'desc',
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

  const getUsers = () => {
    axios.post(activeLink, queries)
    .then(res => {
      console.log(res)
        setUsers(res.data.data)
        setLinks(res.data.meta.links)
    })
    .catch(error => {
    });
  }

  useEffect(() => {
    getUsers();
  }, [activeLink, queries])

  const [checkedItems, setCheckedItems] = useState(users);

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
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
          <Link
            href={route('user.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
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
                      <TableHeading
                        name="name"
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        name="email"
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>

                      <th className="px-3 py-3">Tasks</th>

                      <th className="px-3 py-3">Is verified</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="flex items-center justify-center text-center w-10">
                        <Checkbox className="mt-4" onChange={(e) => handleSelectAll(e)}></Checkbox>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          placeholder="User Name"
                          onChange={(e) =>
                            handleQuery({keyword: e.target.value})
                          }
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={user.id}
                      >
                        <td className="flex items-center justify-center text-center">
                          {/* <Checkbox className="mt-4" checked={checkedItems[index][user.id] || false} onChange={(e) => handleCheckboxChange(e, user.id)}></Checkbox> */}
                        </td>
                        <td className="px-3 py-2">{user.id}</td>
                        <th className="px-3 py-2 text-nowrap hover:underline">
                          <Link href={route('user.show', user.id)}>
                            {user.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">
                          {user.email}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          0
                        </td>
                        <td className="px-3 py-2 text-nowrap">
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
                        </td>
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
