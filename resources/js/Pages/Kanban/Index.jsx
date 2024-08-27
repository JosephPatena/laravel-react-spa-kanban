import { TASK_STATUS_TEXT_MAP, PRIORITY_STATUS_TEXT_MAP, PRIORITY_STATUS_BORDER_CLASS_MAP } from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdvancedSearch from "@/Pages/Task/AdvancedSearch";
import { HTML5Backend } from 'react-dnd-html5-backend';
import TasksContainer from './TasksContainer';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from 'react';
import ShowTaskModal from './ShowTaskModal';
import AddTaskModal from './AddTaskModal';
import { Head } from "@inertiajs/react";
import { DndProvider } from 'react-dnd';
import axios from 'axios';

export const ItemTypes = {
    TASK: 'task'
}

function Home({auth, projects, users}) {
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false); // view task modal x edit
    const [isOpenModal, setIsOpenModal] = useState(false); // new task modal
    const [priority, setPriority] = useState("");
    const [collapse, setCollapse] = useState([]);
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(0);

    const [queries, setQuery] = useState({
        show: 25,
        project_ids: [],
        from_task_page: false
    });

    const getTasks = async () => {
        await axios.post(route('task.fetch'), queries)
        .then(res => {
            setTasks(res.data.data)
        })
        .catch(error => {
        });
    }

    const handleOpenModal = (status, priority) => {
        setIsOpenModal(!isOpenModal)
        setPriority(priority)
        setStatus(status)
    }

    const handleOpenTaskModal = (task) => {
        setIsOpenTaskModal(!isOpenTaskModal)
        setTask(task)
    }

    const toggleItem = (item) => {
        const index = collapse.indexOf(item);
        let updateCollapse;

        if (index === -1) {
            // Item does not exist, add it to the new array
            updateCollapse = [...collapse, item];
        } else {
            // Item exists, remove it from the new array
            updateCollapse = collapse.filter(i => i !== item);
        }
        setCollapse(updateCollapse);
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <AdvancedSearch
                        getTasks={getTasks}
                        projects={projects}
                        setQuery={setQuery}
                        users={users}
                    />
                }
            >
                <Head title="Kanban Board" />
                <div className="py-12 pt-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {
                            isOpenModal &&
                            <AddTaskModal
                                handleOpenModal={handleOpenModal}
                                getTasks={getTasks}
                                priority={priority}
                                projects={projects}
                                status={status}
                                users={users}
                            />
                        }
                        {
                            isOpenTaskModal && 
                            <ShowTaskModal
                                handleOpenTaskModal={handleOpenTaskModal}
                                getTasks={getTasks}
                                users={users}
                                task={task}
                            />
                        }
                        {
                            Object.entries(PRIORITY_STATUS_TEXT_MAP).map(([urgency, title]) => {
                                return (
                                    <div key={urgency} className={`${!collapse.includes(title) ? 'h-full min-h-screen' : ''} pb-5 pt-5`}>
                                        <p className={`mx-auto container p-4 bg-white font-bold rounded-lg border border-l-4 ${PRIORITY_STATUS_BORDER_CLASS_MAP[urgency]}`}>
                                            {title}
                                            <span
                                                onClick={() => {
                                                    toggleItem(title)
                                                }}
                                                className="float-right text-gray-500 mt-1 cursor-pointer">
                                                {
                                                    collapse.includes(title) &&
                                                    <FaChevronRight/>
                                                }
                                                {
                                                    !collapse.includes(title) &&
                                                    <FaChevronDown/>
                                                }
                                            </span>
                                        </p>
                                        {
                                            !collapse.includes(title) &&
                                            <div className='mt-5 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 px-2 md:px-0'>
                                                {Object.entries(TASK_STATUS_TEXT_MAP).map(([progress]) => (
                                                    <TasksContainer
                                                        key={progress}
                                                        tasks={tasks}
                                                        status={progress}
                                                        priority={urgency}
                                                        getTasks={getTasks}
                                                        handleOpenModal={handleOpenModal}
                                                        handleOpenTaskModal={handleOpenTaskModal}
                                                    />
                                                ))}
                                            </div>
                                        }
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