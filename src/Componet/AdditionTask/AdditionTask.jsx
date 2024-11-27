import React, { useState, useCallback } from 'react';
import './AdditionTask.scss';
import shareIcon from '../../Icon/sharee.png';
import editIcon from '../../Icon/edit.png';
import deleteIcon from '../../Icon/cross.png';

const AdditionTask = ({ taskTitle, taskAbout, onToggleExpand, onDelete, onEdit, onShare }) => {
    const [isIconsVisible, setIconsVisibility] = useState(false);

    const onClickShare = useCallback(() => onShare({ title: taskTitle, about: taskAbout }), [onShare, taskTitle, taskAbout]);
    const onClickEdit = useCallback(() => onEdit({ title: taskTitle, about: taskAbout }), [onEdit, taskTitle, taskAbout]);

    return (
        <div 
            className="custom-task-container"
            onMouseEnter={() => setIconsVisibility(true)} 
            onMouseLeave={() => setIconsVisibility(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p className="task-about" onClick={onToggleExpand}>
                    {taskAbout}
                </p>
            </div>

            {/* Иконки для действий */}
            {isIconsVisible && (
                <div className="icons-container">
                    <button 
                        className="action-button" 
                        onClick={onClickShare}
                        aria-label="Share"
                    >
                        <img src={shareIcon} alt="Share" className="action-icon" />
                    </button>
                    <button 
                        className="action-button" 
                        onClick={onClickEdit}
                        aria-label="Edit"
                    >
                        <img src={editIcon} alt="Edit" className="action-icon" />
                    </button>
                </div>
            )}

            {/* Кнопка удаления */}
            <button 
                className="action-button delete-button" 
                onClick={onDelete} 
                aria-label="Delete"
            >
                <img src={deleteIcon} alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;