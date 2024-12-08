// src/components/AddTaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Форма для добавления задачи
const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAbout, setTaskAbout] = useState('');
  const dispatch = useDispatch();  // Используем dispatch для отправки действий в Redux

  // Обработчик добавления задачи
  const handleAddTask = () => {
    if (!taskTitle || !taskAbout) return;  // Проверяем, что оба поля заполнены

    // Создаем новую задачу
    const newTask = {
      id: Date.now(),  // Уникальный ID задачи (можно использовать библиотеку для генерации ID)
      title: taskTitle,
      about: taskAbout,
      expanded: false,  // По умолчанию задача не развернута
    };

    // Отправляем задачу в Redux
    dispatch({
      type: 'ADD_TASK',  // Тип действия
      payload: newTask,  // Данные для добавления в store
    });

    // Очистка полей после добавления задачи
    setTaskTitle('');
    setTaskAbout('');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      {/* Поле для ввода названия задачи */}
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title"
      />
      
      {/* Поле для ввода описания задачи */}
      <textarea
        value={taskAbout}
        onChange={(e) => setTaskAbout(e.target.value)}
        placeholder="Task Description"
      />
      
      {/* Кнопка для добавления задачи */}
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export { AddTaskForm };
