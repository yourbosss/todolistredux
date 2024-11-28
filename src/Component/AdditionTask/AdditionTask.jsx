import React, { useState } from 'react';
import './AdditionTask.scss';
import shareIcon from '../../Icon/sharee.png';
import editIcon from '../../Icon/edit.png';
import deleteIcon from '../../Icon/cross.png';
import infoIcon from '../../Icon/info.png';
const AdditionTask = ({ taskTitle, taskAbout, onToggleExpand, onDelete, onEdit, onShare }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleShareClick = () => {
        if (onShare && typeof onShare === 'function') {
            onShare({ title: taskTitle, about: taskAbout });
        } else {
            console.error('onShare is not a function');
        }
    };

    const handleEditClick = () => {
        if (onEdit && typeof onEdit === 'function') {
            onEdit({ title: taskTitle, about: taskAbout });
        } else {
            console.error('onEdit is not a function');
        }
    };

    const handleInfoClick = () => {
        console.log('Info clicked');
    };

    const handleDeleteClick = () => {
        if (onDelete && typeof onDelete === 'function') {
            onDelete();
        } else {
            console.error('onDelete is not a function');
        }
    };

    return (
        <div
            className="custom-task-container"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p onClick={onToggleExpand} className="task-about">
                    {taskAbout}
                </p>
            </div>

            {showIcons && (
                <div className="icons-container">
                    <button className="action-button" onClick={handleShareClick}>
                        <img src={shareIcon} alt="Share" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleEditClick}>
                        <img src={editIcon} alt="Edit" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleInfoClick}>
                        <img src={infoIcon} alt="Info" className="action-icon" />
                    </button>
                </div>
            )}

            <button className="action-button delete-button" onClick={handleDeleteClick}>
                <img src={deleteIcon} alt="Delete" className="action-icon" />
            </button>
        </div>
    );
}

export { AdditionTask };
