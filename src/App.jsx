// import './App.css'
import './styles/index.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import { UIFeedBackProvider } from './contexts/toastContext';


function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <UIFeedBackProvider>
              <Dashboard />
            </UIFeedBackProvider>
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App
