import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../redux/task.slice';  // Импортируем редьюсер из слайса

const store = configureStore({
  reducer: {
    tasks: taskReducer,  // Привязываем редьюсер к ключу tasks
  },
});

export default store;
