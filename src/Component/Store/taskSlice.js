import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    expandedTasks: {},
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; 
      }
    },
    toggleExpandTask: (state, action) => {
      const taskId = action.payload;
      state.expandedTasks[taskId] = !state.expandedTasks[taskId];
    },
  },
});

export const { addTask, deleteTask, editTask, toggleExpandTask } = taskSlice.actions;
export default taskSlice.reducer;