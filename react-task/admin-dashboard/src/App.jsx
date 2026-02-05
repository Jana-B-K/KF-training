import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Form from './components/Form';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Reports from './components/Report';
import ViewProfile from './components/ViewProfile';
import './index.css';

// This component uses useContext, so it MUST be a child of AuthProvider
function AppRoutes() {
  const { state } = useContext(AuthContext);
  
  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);
  
  return (
    <div className={`app ${state.theme}`}>
      <Routes>
        <Route path="/login" element={!state.isAuthenticated ? <Form /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={state.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={state.isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/users" element={state.isAuthenticated ? <Users /> : <Navigate to="/login" />} />
        <Route path="/report" element={state.isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/viewProfile/:id" element={state.isAuthenticated ? <ViewProfile /> : <Navigate to="/login" />} /> 

        <Route path="*" element={<Navigate to={state.isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

// Top level component
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* AppRoutes is now properly inside the Provider */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
