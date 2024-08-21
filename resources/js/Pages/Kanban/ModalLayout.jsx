import React from 'react'

function ModalLayout({ children, handleOpenModal }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={handleOpenModal}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default ModalLayout