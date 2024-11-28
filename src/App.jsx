import React from 'react';
import './StyleMain.css';
import "./App.css"
import { CreateTask } from "./Component/CreateTask/CreateTask.jsx"
import { AdditionTask } from "./Component/AdditionTask/AdditionTask.jsx"

function App() {
  return (
    <div>
      <div className="container">
        <CreateTask />
        <AdditionTask />
      </div>
    </div>
  );
}

export default App;
