import React from 'react'

function ModalLayout({ children, handleOpenModal }) {
    return (
        <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mt-16 mb-8 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-4xl"
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