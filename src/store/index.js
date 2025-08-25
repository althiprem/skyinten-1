// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";

// Temporary placeholder reducers until we wire them up
const userReducer = (
  state = { name: "Lingam", streakDays: 5, accomplishments: [] }
) => state;
const coursesReducer = (state = { list: [] }) => state;
const hackathonsReducer = (state = { list: [] }) => state;
const progressReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    hackathons: hackathonsReducer,
    progress: progressReducer,
  },
});
