import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Editor from './components/Editor';
import { Provider } from 'react-redux';
import store from './state/store';
import CssBaseline from '@mui/material/CssBaseline';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <Editor />
    </Provider>
  </StrictMode>
);
