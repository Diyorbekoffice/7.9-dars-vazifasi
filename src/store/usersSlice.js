// src/features/users/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex((student) => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...action.payload };
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((student) => student.id !== action.payload);
    },
    clearAllStudents: (state) => {
      state.students = [];
    },
    getStudentById: (state, action) => {
      return state.students.find((student) => student.id === action.payload);
    },
    updateStudentAge: (state, action) => {
      const student = state.students.find((student) => student.id === action.payload.id);
      if (student) student.age = action.payload.age;
    },
    updateStudentName: (state, action) => {
      const student = state.students.find((student) => student.id === action.payload.id);
      if (student) student.name = action.payload.name;
    },
  },
});

export const {
  addStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents,
  getStudentById,
  updateStudentAge,
  updateStudentName,
} = usersSlice.actions;

export default usersSlice.reducer;
