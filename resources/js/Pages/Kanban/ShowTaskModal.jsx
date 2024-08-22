import { router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import ModalLayout from './ModalLayout';
import View from '@/Pages/Task/View';
import toast from 'react-hot-toast';


function ShowTaskModal({ handleOpenTaskModal, id, category, getTasks, project_id, users }) {
    const [task, setTask] = useState({
        id: 0,
        name: "",
        description: "",
        category: "",
        index: 0,
    });

    const handleChange = (e) => {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const fetchTask = async (id) => {
        try {
            axios.get(route('kanban.show', id))
            .then(res => {
                setTask((prev) => {
                    return { ...prev, ...res.data.task }
                })
            })
            .catch(err => {

            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {
            const res = await router.put(route('kanban.update', id), task)
            if (res.status === 200) {
                toast.success('Task has been updated')
                handleOpenTaskModal()
                getTasks(project_id)
            }
        } catch (error) {
            if (error.response.data.errors?.title) {
                toast.error(error.response.data.errors.title[0])
            }
            if (error.response.data.errors?.description) {
                toast.error(error.response.data.errors.description[0])
            }
        }
    }

    useState(() => {
        fetchTask(id)
    }, [])

    return (
        <>
            <ModalLayout handleOpenModal={handleOpenTaskModal}>
                <View id={id} users={users}></View>
            </ModalLayout>
        </>
    )
}

export default ShowTaskModal