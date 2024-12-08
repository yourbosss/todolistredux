// src/components/AdditionTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AdditionTask.scss';
import shareIcon from '../../Icon/sharee.png';
import editIcon from '../../Icon/edit.png';
import deleteIcon from '../../Icon/cross.png';
import infoIcon from '../../Icon/info.png';

const AdditionTask = ({ taskId, taskTitle, taskAbout, expanded }) => {
    const [showIcons, setShowIcons] = useState(false);
    const dispatch = useDispatch();

    const handleShareClick = () => {
        console.log('Share clicked');
    };

    const handleEditClick = () => {
        dispatch({
            type: 'EDIT_TASK',
            payload: {
                id: taskId,
                title: taskTitle,
                about: taskAbout,
            },
        });
    };

    const handleDeleteClick = () => {
        dispatch({
            type: 'DELETE_TASK',
            payload: taskId,
        });
    };

    const handleInfoClick = () => {
        console.log('Info clicked');
    };

    const handleExpandToggle = () => {
        dispatch({
            type: 'TOGGLE_EXPAND_TASK',
            payload: taskId,
        });
    };

    return (
        <div
            className="custom-task-container"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p onClick={handleExpandToggle} className={`task-about ${expanded ? 'expanded' : 'collapsed'}`}>
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
};

export { AdditionTask };
