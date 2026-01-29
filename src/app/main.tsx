import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/app/styles/index.css';
import { AppProvider } from '@/app/providers/app-provider';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
