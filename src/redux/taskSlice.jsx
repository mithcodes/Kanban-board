import { createSlice } from "@reduxjs/toolkit";

const getTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: getTasksFromLocalStorage(),
  searchTerm: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? action.payload
          : task
      );
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    moveTask: (state, action) => {
      state.tasks = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  moveTask,
  setSearchTerm,
} = taskSlice.actions;

export default taskSlice.reducer;