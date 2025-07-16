// Componente principale dell'applicazione
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import DocenteDashboard from './components/Dashboard/DocenteDashboard';
import StudenteDashboard from './components/Dashboard/StudenteDashboard';

// Componente interno che usa il context
const AppContent: React.FC = () => {
  const { isAuthenticated, isDocente, isStudente } = useAuth();

  // Se l'utente non è autenticato, mostra il form di login
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Se l'utente è autenticato, mostra l'header e la dashboard appropriata
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        {isDocente && <DocenteDashboard />}
        {isStudente && <StudenteDashboard />}
      </main>
    </div>
  );
};

// Componente principale che fornisce il context
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;