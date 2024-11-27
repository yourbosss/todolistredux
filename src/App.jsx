import React from 'react';
import "./"
//import './Main/StyleMain.css';

//import './Сomponents/CreateTask/CreateTask.scss';
//import './Сomponents/AdditionTask/AdditionTask.scss';
//import './App.css';  // Внешний CSS

//import CreateTask from './components/CreateTask/CreateTask';
//import AdditionTask from './components/AdditionTask/AdditionTask';


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
