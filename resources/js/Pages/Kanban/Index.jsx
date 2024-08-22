import { TASK_STATUS_TEXT_MAP, PRIORITY_STATUS_TEXT_MAP, PRIORITY_STATUS_BORDER_CLASS_MAP } from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useEffect, useState } from 'react';
import TasksContainer from './TasksContainer';
import AdvancedSearch from "./AdvancedSearch";
import ShowTaskModal from './ShowTaskModal';
import AddTaskModal from './AddTaskModal';
import { Head } from "@inertiajs/react";
import { DndProvider } from 'react-dnd';
import axios from 'axios';

export const ItemTypes = {
    TASK: 'task'
}

function Home({auth}) {
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [projectId, setprojectId] = useState(0);
    const [projects, setProjects] = useState([]);
    const [category, setCategory] = useState("");
    const [taskId, setTaskId] = useState(0);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const getTasks = async (id) => {
        await axios.post(route('task.fetch', id))
        .then(res => {
            setTasks(res.data.tasks)
        })
        .catch(error => {
        });
    }

    const getProjects = async () => {
        await axios.post(route('project.fetch'))
        .then(res => {
            setProjects(res.data.projects)
        })
        .catch(error => {
        });
    }

    const getUsers = async () => {
        await axios.post(route('user.fetch'))
        .then(res => {
            setUsers(res.data.users)
        })
        .catch(error => {
        });
    }

    const handleProjectChange = (id) => {
        setprojectId(id);
        getTasks(id)
    }

    const handleOpenModal = (category) => {
        setIsOpenModal(!isOpenModal)
        setCategory(category)
    }

    const handleOpenTaskModal = (category, id) => {
        setIsOpenTaskModal(!isOpenTaskModal)
        setCategory(category)
        setTaskId(id)
    }

    useEffect(() => {
        getProjects();
        getTasks(projectId);
        getUsers();
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <AdvancedSearch></AdvancedSearch>
                }
            >
                <Head title="Kanban Board" />
                <div className="py-12 pt-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {
                            isOpenModal &&
                            <AddTaskModal
                                handleOpenModal={handleOpenModal}
                                project_id={projectId}
                                category={category}
                                getTasks={getTasks}
                                auth={auth}
                            />
                        }
                        {
                            isOpenTaskModal && 
                            <ShowTaskModal
                                handleOpenTaskModal={handleOpenTaskModal}
                                project_id={projectId}
                                category={category}
                                getTasks={getTasks}
                                users={users}
                                id={taskId}
                            />
                        }
                        {
                            Object.entries(PRIORITY_STATUS_TEXT_MAP).map(([priority, index], key) => {
                                return (
                                    <div key={key} className='h-full min-h-screen pb-5 pt-5'>
                                        <p className={`mx-auto container p-4 bg-white font-bold rounded-lg border border-l-4 ${PRIORITY_STATUS_BORDER_CLASS_MAP[priority]}`}>
                                            {index}
                                        </p>
                                        <div className='mt-5 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 px-2 md:px-0'>
                                            {Object.entries(TASK_STATUS_TEXT_MAP).map(([status]) => (
                                                <TasksContainer
                                                    key={status} // Assuming `status` is unique; if not, you can use a combination of `status` and `priority` or another unique identifier
                                                    getTasks={getTasks}
                                                    tasks={tasks}
                                                    category={status}
                                                    priority={priority}
                                                    handleOpenModal={handleOpenModal}
                                                    handleOpenTaskModal={handleOpenTaskModal}
                                                    project_id={projectId}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        }       
                    </div>
                </div>
            </AuthenticatedLayout>
        </DndProvider>
    );
}

export default Home