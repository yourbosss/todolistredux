// src/App.jsx
import React from 'react';
import AddTaskForm from './components/AddTaskForm';  // Обновлен путь к AddTaskForm

const App = () => {
  return (
    <div>
      <h1>Task List</h1>
      <AddTaskForm />
      {/* другие компоненты */}
    </div>
  );
};

export default App;
