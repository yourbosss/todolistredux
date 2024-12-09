import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';

import TaskList from './TaskList.jsx';
import TaskInputForm from './TaskForm.jsx';
import DeleteModal from '../Delete/Delete.jsx';
import EditModal from '../Edit/Edit.jsx';
import ShareModal from '../Share/ShareTask.jsx';

import { addTask, deleteTask, editTask, toggleExpandTask } from '../Store/taskSlice.js';

const CreateTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const expandedTasks = useSelector((state) => state.tasks.expandedTasks);
  const [taskToDelete, setTaskToDelete] = React.useState(null);
  const [taskToEdit, setTaskToEdit] = React.useState(null);
  const [taskToShare, setTaskToShare] = React.useState(null);
  const [modals, setModals] = React.useState({
    delete: false,
    edit: false,
    share: false,
  });
  const [formFields, setFormFields] = React.useState({
    title: '',
    about: '',
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => dispatch(addTask(task)));
  }, [dispatch]);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleFormChange = (field, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleAddClick = () => {
    const { title, about } = formFields;

    if (!title.trim() || !about.trim()) {
      alert('Заполните все поля!');
      return;
    }

    const newTask = { id: Date.now() + Math.random(), title, about };
    dispatch(addTask(newTask));

    setFormFields({ title: '', about: '' });
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setModals((prev) => ({ ...prev, delete: true }));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(taskToDelete));
    setModals((prev) => ({ ...prev, delete: false }));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setModals((prev) => ({ ...prev, edit: true }));
  };

  const handleSaveEdit = (updatedTask) => {
    dispatch(editTask(updatedTask));
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
    dispatch(toggleExpandTask(taskId));
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
          expandedTaskId={expandedTasks}
          onToggleExpand={handleToggleExpand}
          onDelete={handleDeleteClick}
          onEdit={handleEditTask}
          onShare={handleShareClick}
        />
      </DragDropContext>

      {modals.delete && <DeleteModal onConfirm={handleConfirmDelete} onCancel={() => handleModalClose('delete')} />}
      {modals.edit && <EditModal isOpen={modals.edit} onClose={() => handleModalClose('edit')} task={taskToEdit} onSave={handleSaveEdit} />}
      {modals.share && <ShareModal title={taskToShare?.title} about={taskToShare?.about} onClose={() => handleModalClose('share')} />}
    </div>
  );
};

export { CreateTask };
