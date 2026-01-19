import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppShell from './components/layout/AppShell';

// Lazy Load Pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const HRAdmin = React.lazy(() => import('./pages/HRAdmin'));
const Sales = React.lazy(() => import('./pages/Sales'));
const Finance = React.lazy(() => import('./pages/Finance'));
const ITDesk = React.lazy(() => import('./pages/ITDesk')); // Make sure this matches filename
const Legal = React.lazy(() => import('./pages/Legal'));
const Marketing = React.lazy(() => import('./pages/Marketing'));
const Engineering = React.lazy(() => import('./pages/Engineering'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Games = React.lazy(() => import('./pages/Games'));


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

            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hr-admin" element={<HRAdmin />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/it-desk" element={<ITDesk />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/games" element={<Games />} />


              {/* Fallback */}
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
