import { useContext, useEffect } from 'react';  // ✅ ADDED useEffect import
import { AuthProvider, AuthContext } from './context/AuthContext';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import './index.css';
import './App.css';

function AppContent() {
  const { state } = useContext(AuthContext);
  
  // Apply theme to body
  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);
  
  return (
    <div className={`app ${state.theme}`}>
      {state.isAuthenticated ? <Dashboard /> : <Form />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
