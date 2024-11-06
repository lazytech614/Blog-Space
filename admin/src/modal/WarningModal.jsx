import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const WarningModal = ({ warning, isOpenWarningModal, setIsOpenWarningModal, onConfirmDelete }) => {
    useEffect(() => {
        if (document) {
            document.body.style.overflowY = isOpenWarningModal ? 'hidden' : 'scroll';
        }
    }, [isOpenWarningModal]);

    if (!isOpenWarningModal) return null;

    return createPortal(
        <div className='fixed inset-0 z-[100] flex items-center justify-center'>
            <div className='bg-[#171717bf] fixed inset-0'></div>
            <div className='bg-white p-6 rounded-md z-[101]'>
                <p className='text-center mb-4'>{warning}</p>
                <div className='flex justify-center gap-4'>
                    <button
                        onClick={() => {
                            onConfirmDelete();
                            setIsOpenWarningModal(false);
                        }}
                        className='bg-red-500 text-white px-4 py-2 rounded-md'
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setIsOpenWarningModal(false)}
                        className='bg-gray-500 text-white px-4 py-2 rounded-md'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>,
        document.querySelector('.showMyPortal')
    );
};
