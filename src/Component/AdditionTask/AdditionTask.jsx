import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleExpandTask, editTask } from '../Store/taskSlice.js';
import EditModal from '../Edit/Edit'; // Импортируем модальное окно для редактирования
import ShareModal from '../Share/ShareTask'; // Импортируем модальное окно для дележа
import './AdditionTask.scss';

const AdditionTask = ({ taskId, taskTitle, taskAbout }) => {
    const [showIcons, setShowIcons] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const dispatch = useDispatch();
    const expandedTasks = useSelector(state => state.tasks.expandedTasks);

    const handleDeleteClick = () => {
        dispatch(deleteTask(taskId));
    };

    const handleExpandToggle = () => {
        dispatch(toggleExpandTask(taskId));
    };

    const expanded = expandedTasks[taskId] || false;

    const handleEditSave = (updatedTask) => {
        dispatch(editTask(updatedTask));
        setEditModalOpen(false); // Закрываем модальное окно после сохранения
    };

    const handleShareClick = () => {
        setShareModalOpen(true);
        setShowIcons(true); // Показываем иконки при нажатии на "Поделиться"
    };

    return (
        <div className="custom-task-container">
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p onClick={handleExpandToggle} className={`task-about ${expanded ? 'expanded' : 'collapsed'}`}>
                    {taskAbout}
                </p>
            </div>

            {/* Кнопка "Поделиться", которая открывает модальное окно */}
            <button className="action-button" onClick={handleShareClick}>
                Поделиться
            </button>

            {/* Иконки для редактирования и удаления */}
            {showIcons && (
                <div className="icons-container">
                    <button className="action-button" onClick={() => setEditModalOpen(true)}>
                        Изменить
                    </button>
                    <button className="action-button" onClick={handleDeleteClick}>
                        Удалить
                    </button>
                </div>
            )}

            {/* Модальное окно для редактирования */}
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                task={{ id: taskId, title: taskTitle, about: taskAbout }}
                onSave={handleEditSave}
            />

            {/* Модальное окно для дележа */}
            <ShareModal
                title={taskTitle}
                about={taskAbout}
                onClose={() => {
                    setShareModalOpen(false);
                    setShowIcons(false);
                }}
            />
        </div>
    );
};

export { AdditionTask };