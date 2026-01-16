import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppShell from './components/layout/AppShell';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

// New Enterprise Modules
import Sales from './pages/Sales';
import Marketing from './pages/Marketing';
import Finance from './pages/Finance';
import Engineering from './pages/Engineering';
import Legal from './pages/Legal';
import HRAdmin from './pages/HRAdmin';

import LeaveList from './components/modules/leave/LeaveList';
import LeaveApplicationForm from './components/modules/leave/LeaveApplicationForm';
import LeaveDetail from './components/modules/leave/LeaveDetail';

import ITDesk from './components/modules/it-desk/ITDesk';
import TicketForm from './components/modules/it-desk/TicketForm';
import TicketDetail from './components/modules/it-desk/TicketDetail';

import LPOList from './components/modules/lpo/LPOList';
import LPODetail from './components/modules/lpo/LPODetail';

import DocumentList from './components/modules/documents/DocumentList';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Enterprise Modules */}
            <Route path="/hr-admin" element={<HRAdmin />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/legal" element={<Legal />} />

            {/* Legacy Modules (Accessible via direct link or if linked in future) */}
            <Route path="/leave" element={<LeaveList />} />
            <Route path="/leave/apply" element={<LeaveApplicationForm />} />
            <Route path="/leave/:id" element={<LeaveDetail />} />

            <Route path="/it-desk" element={<ITDesk />} />
            <Route path="/it-desk/new" element={<TicketForm />} />
            <Route path="/it-desk/:id" element={<TicketDetail />} />

            <Route path="/lpo" element={<LPOList />} />
            <Route path="/lpo/:id" element={<LPODetail />} />

            <Route path="/documents" element={<DocumentList />} />

            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
