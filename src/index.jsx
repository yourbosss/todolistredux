import { combineReducers } from 'redux';
import taskReducer from './redux/task.slice'; // Исправлен путь

const rootReducer = combineReducers({
  tasks: taskReducer,  // Связываем слайс с состоянием tasks
});

export default rootReducer;