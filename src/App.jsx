import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppShell from './components/layout/AppShell';

// Lazy load pages for performance
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Loading Fallback
const LoadingScreen = () => (
  <div className="flex h-screen w-full items-center justify-center bg-deep-space text-cyan-400">
    <div className="animate-spin-slow text-4xl material-symbols-outlined">smart_toy</div>
  </div>
);

function App() {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Protected Routes directly under AppShell for now */}
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Placeholders for other routes to prevent crashes if visited */}
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
