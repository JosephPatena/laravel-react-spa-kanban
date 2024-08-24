import ModalLayout from './ModalLayout';
import ViewTask from '@/Pages/Task/View';


function ShowTaskModal({ handleOpenTaskModal, task, getTasks, users }) {
    return (
        <>
            <ModalLayout handleOpenModal={handleOpenTaskModal}>
                <ViewTask
                    task={task}
                    users={users}
                    getTasks={getTasks}
                ></ViewTask>
            </ModalLayout>
        </>
    )
}

export default ShowTaskModal