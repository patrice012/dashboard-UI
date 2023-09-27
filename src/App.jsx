// import './App.css'
import './styles/index.css';
import Dashboard from "./pages/Dashboard";
import UserProvider from './contexts/userContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Dashboard />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App
