import React from 'react';
import { Provider } from 'react-redux';

import './StyleMain.css';
import store from './Component/Store/store.js';
import './App.css';
import { CreateTask } from './Component/CreateTask/CreateTask.jsx';
import { AdditionTask } from './Component/AdditionTask/AdditionTask.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <CreateTask />
        <AdditionTask />
      </div>
    </Provider>
  );
}

export default App;