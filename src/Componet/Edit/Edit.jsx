import React, { useState, useCallback } from 'react';
import './Edit.scss';

const EditModal = ({ isOpen, onClose, task, onSave }) => {
    const [titleValue, setTitleValue] = useState(task.title || '');
    const [description, setDescription] = useState(task.about || '');
    const [errorText, setErrorText] = useState('');

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            setTitleValue(value);
        } else if (name === 'description') {
            setDescription(value);
        }

        if (errorText) {
            setErrorText('');
        }
    }, [errorText]);

    const handleModalClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleFormSave = useCallback(() => {
        if (!titleValue.trim() || !description.trim()) {
            setErrorText('А ну живо заполни все поля!!!');
            return;
        }

        onSave({ ...task, title: titleValue, about: description });
        onClose();
    }, [titleValue, description, task, onSave, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="title"
                        value={titleValue}
                        onChange={handleInputChange}
                        placeholder="Task Title"
                        className="input-field"
                    />
                </div>

                <div className="input-wrapper">
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        placeholder="Task Description"
                        className="textarea-field"
                    />
                </div>

                <div className="action-buttons">
                    <button className="action-button cancel" onClick={handleModalClose}>
                        Cancel
                    </button>
                    <button className="action-button save" onClick={handleFormSave}>
                        Save
                    </button>
                </div>

                {errorText && (
                    <div className="error-message">
                        {errorText}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditModal;