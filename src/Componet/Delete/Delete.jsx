import React, { useState } from 'react';
import './Delete.scss';

const DeleteModal = ({ onConfirm, onCancel }) => {
    const [showModal, setShowModal] = useState(true);

    const closeModal = (action) => {
        action();
        setShowModal(false);
    };

    // Если модальное окно закрыто, ничего не отображаем
    if (!showModal) return null;

    return (
        <div className="modal-button-delete">
            <div className="modal-content-button-delete">
                {/* Верхняя граница модалки */}
                <div className="modal-border-top-button-delete" />
                
                {/* Заголовок модалки */}
                <div className="modal-header-button-delete">
                    <h3>Are you sure you want to delete this task?</h3>
                </div>

                {/* Кнопки для подтверждения или отмены */}
                <div className="modal-buttons-button-delete">
                    <button 
                        className="button-button-delete"
                        onClick={() => closeModal(onConfirm)}
                    >
                        Confirm
                    </button>
                    <button 
                        className="button-button-delete"
                        onClick={() => closeModal(onCancel)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;