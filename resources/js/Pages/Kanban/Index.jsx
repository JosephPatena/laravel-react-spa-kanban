import React, { useContext, useEffect, useState } from 'react'
import AddTaskModal from './AddTaskModal';
import ShowTaskModal from './ShowTaskModal';
import TasksContainer from './TasksContainer';
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SelectInput from '@/Components/SelectInput';
import axios from 'axios';

export const ItemTypes = {
    TASK: 'task'
}

function Home({auth}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
    const [category, setCategory] = useState("");
    const [taskId, setTaskId] = useState(0);
    const [projectId, setprojectId] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    const getTasks = async (id) => {
        setTasks([])
        axios.post(route('task.fetch', id))
        .then(response => {
            setTasks(response.data.tasks)
        })
        .catch(error => {
        });
    }

    const getProjects = async () => {
        axios.get(route('project.fetch'))
        .then(response => {
            setProjects(response.data.projects)
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

    const statuses = {
        todo: {
            title: 'To Do',
            color: 'red'
        },
        in_progress: {
            title: 'In Progress',
            color: 'gray'
        },
        testing: {
            title: 'Testing',
            color: 'blue'
        },
        done: {
            title: 'Done',
            color: 'green'
        }
    }

    useEffect(() => {
        getProjects();
        getTasks(projectId);
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div class="w-full flex">
                        <div class="w-1/2">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                Kanban Board
                            </h2>
                        </div>
                        <div class="w-1/2">
                            <SelectInput
                                name="project_id"
                                id="task_project_id"
                                className="mt-1 block w-full"
                                onChange={(e) => handleProjectChange(e.target.value)}
                                >
                                <option value="">All Project Tasks</option>
                                {projects.map((project) => (
                                    <option value={project.id} key={project.id}>
                                    {project.name}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>
                    </div>
                }
            >
                <Head title="Kanban Board" />
                {isOpenModal && <AddTaskModal handleOpenModal={handleOpenModal} category={category} getTasks={getTasks} project_id={projectId} auth={auth} />}
                {isOpenTaskModal && <ShowTaskModal handleOpenTaskModal={handleOpenTaskModal} category={category} getTasks={getTasks} id={taskId} project_id={projectId} />}
                <div className='h-full min-h-screen pb-10 pt-10'>
                    <div className='mt-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 px-2 md:px-0'>
                        <TasksContainer getTasks={getTasks} tasks={tasks} status={statuses.todo} category={'pending'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                        <TasksContainer getTasks={getTasks} tasks={tasks} status={statuses.in_progress} category={'in_progress'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                        <TasksContainer getTasks={getTasks} tasks={tasks} status={statuses.testing} category={'testing'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                        <TasksContainer getTasks={getTasks} tasks={tasks} status={statuses.done} category={'completed'} handleOpenModal={handleOpenModal} handleOpenTaskModal={handleOpenTaskModal} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </DndProvider>
    );
}

export default Home