import ModalLayout from './ModalLayout';
import AddTask from '@/Pages/Task/Add';

function AddTaskModal({ handleOpenModal, projects, getTasks, users, status, priority }) {
    return (
        <>
            <ModalLayout handleOpenModal={handleOpenModal}>
                <AddTask 
                    handleOpenModal={handleOpenModal}
                    from_task_page={false}
                    projects={projects}
                    getTasks={getTasks}
                    priority={priority}
                    status={status}
                    users={users}
                ></AddTask>
            </ModalLayout>
        </>
    )
}

export default AddTaskModal