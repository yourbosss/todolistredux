import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);  // Добавление задачи
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);  // Удаление задачи по id
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;  // Экспортируем действия
export default taskSlice.reducer;  // Экспортируем редьюсер
