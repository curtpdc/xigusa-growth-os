import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import Dashboard from './pages/Dashboard';
import ContentMachine from './pages/ContentMachine';
import TechnicalTracker from './pages/TechnicalTracker';
import OutreachPipeline from './pages/OutreachPipeline';
import GrowthMetrics from './pages/GrowthMetrics';
import Layout from './components/Layout';
import { msalConfig } from './config/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content" element={<ContentMachine />} />
            <Route path="/technical" element={<TechnicalTracker />} />
            <Route path="/outreach" element={<OutreachPipeline />} />
            <Route path="/metrics" element={<GrowthMetrics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </MsalProvider>
  );
}

export default App;
