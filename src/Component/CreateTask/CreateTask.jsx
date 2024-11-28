import React, { useEffect, useState, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskList from './TaskList';
import TaskInputForm from './TaskForm.jsx';
import DeleteModal from '../Delete/Delete.jsx';
import EditModal from '../Edit/Edit.jsx';
import ShareModal from '../Share/ShareTask.jsx';

const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToShare, setTaskToShare] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [modals, setModals] = useState({
    delete: false,
    edit: false,
    share: false,
  });
  const [formFields, setFormFields] = useState({
    title: '',
    about: '',
  });

  const loadTasks = useCallback(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const saveTasks = useCallback((updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }, []);

  const handleFormChange = (field, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleAddClick = () => {
    const { title, about } = formFields;

    if (!title.trim() || !about.trim()) {
      alert('А ну живо запони все поля!');
      return;
    }

    const newTask = { id: Date.now() + Math.random(), title, about };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);

    setFormFields({ title: '', about: '' });
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setModals((prev) => ({ ...prev, delete: true }));
  };

  const handleConfirmDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    saveTasks(updatedTasks);
    setModals((prev) => ({ ...prev, delete: false }));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setModals((prev) => ({ ...prev, edit: true }));
  };

  const handleSaveEdit = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
    setModals((prev) => ({ ...prev, edit: false }));
  };

  const handleShareClick = (task) => {
    setTaskToShare(task);
    setModals((prev) => ({ ...prev, share: true }));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    saveTasks(reorderedTasks);
  };

  const handleToggleExpand = (taskId) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const handleModalClose = (modal) => {
    setModals((prev) => ({ ...prev, [modal]: false }));
  };

  return (
    <div className="container">
      <TaskInputForm
        title={formFields.title}
        setTitle={(value) => handleFormChange('title', value)}
        about={formFields.about}
        setAbout={(value) => handleFormChange('about', value)}
        onAddClick={handleAddClick}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList
          tasks={tasks}
          expandedTaskId={expandedTaskId}
          onToggleExpand={handleToggleExpand}
          onDelete={handleDeleteClick}
          onEdit={handleEditTask}
          onShare={handleShareClick}
        />
      </DragDropContext>
      {modals.delete && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => handleModalClose('delete')}
        />
      )}
      {modals.edit && (
        <EditModal
          isOpen={modals.edit}
          onClose={() => handleModalClose('edit')}
          task={taskToEdit}
          onSave={handleSaveEdit}
        />
      )}
      {modals.share && (
        <ShareModal
          title={taskToShare?.title}
          about={taskToShare?.about}
          onClose={() => handleModalClose('share')}
        />
      )}
    </div>
  );
};

export { CreateTask };