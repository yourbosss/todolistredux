import React from 'react';
import './Main/StyleMain.scss';
import './Component/CreateTask/CreateTask.scss';
import './Component/AdditionTask/AdditionTask.scss';
import './App.css';
import CreateTask from './Component/CreateTask/CreateTask.jsx';

function App() {
  return (
    <div>
      <div className="container">
        <CreateTask />
      </div>
    </div>
  );
}

export default App;
