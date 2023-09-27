// import './App.css'
import './styles/index.css';
import Dashboard from "./pages/Dashboard";
import UserProvider from './providers/userProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <Dashboard />
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App
