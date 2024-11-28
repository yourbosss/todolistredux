import React, { useState, useEffect } from 'react';
import './Edit.scss';

export default function EditModal({ isOpen, onClose, task, onSave }) {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setAbout(task.about || '');
        }
    }, [task]);

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        if (!title.trim() || !about.trim()) {
            setErrorMessage('Заполни все поля!');
            return;
        }

        try {
            await onSave({ ...task, title, about });
            onClose();
        } catch (error) {
            setErrorMessage('Ошибка при сохранении задачи. Попробуйте позже.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Название задачи"
                    className="modal-input"
                    autoFocus
                />
                <textarea
                    value={about}
                    onChange={(e) => {
                        setAbout(e.target.value);
                        if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Описание задачи"
                    className="modal-textarea"
                />
                <div className="modal-buttons">
                    <button onClick={handleClose}>Отменить</button>
                    <button onClick={handleSave}>Сохранить</button>
                </div>
                {errorMessage && (
                    <div id="error-message" className="error-container">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}