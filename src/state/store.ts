import { configureStore } from '@reduxjs/toolkit';
import EditorSlice from './editorSlice';

// Example: import your reducers here
// import rootReducer from './rootReducer';

const store = configureStore({
  reducer: {
    editor: EditorSlice,
  },
  // middleware, devTools, etc. can be customized here if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
