import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppShell from './components/layout/AppShell';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

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

            {/* Leave Module */}
            <Route path="/leave" element={<LeaveList />} />
            <Route path="/leave/apply" element={<LeaveApplicationForm />} />
            <Route path="/leave/:id" element={<LeaveDetail />} />

            {/* IT Desk Module */}
            <Route path="/it-desk" element={<ITDesk />} />
            <Route path="/it-desk/new" element={<TicketForm />} />
            <Route path="/it-desk/:id" element={<TicketDetail />} />

            {/* LPO Module */}
            <Route path="/lpo" element={<LPOList />} />
            <Route path="/lpo/:id" element={<LPODetail />} />

            {/* Documents */}
            <Route path="/documents" element={<DocumentList />} />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
