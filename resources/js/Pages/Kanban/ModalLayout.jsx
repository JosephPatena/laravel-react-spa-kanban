import { useRef } from 'react';

const ModalLayout = ({ handleOpenModal, children }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleOpenModal();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 overflow-y-auto custom-scrollbar"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg max-w-2xl w-full mt-16 mb-8 relative"
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-4xl"
                    onClick={handleOpenModal}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
