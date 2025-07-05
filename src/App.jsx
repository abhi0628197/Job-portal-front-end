import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Company from './components/Company';
import Jobs from './components/Jobs';
import Applicant from './components/Applicant';

import './App.css';
import LandingPage from './components/Landingpage';
import Dashboard from './components/Dashborad';
import Applications from './components/Applications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard with Sidebar always */}
      <Route path="/dashboard" element={
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Dashboard />
          </div>
        </div>
      } />

      {/* Recruiter Pages */}
      <Route path="/company" element={
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Company />
          </div>
        </div>
      } />
      <Route path="/jobs" element={
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Jobs />
          </div>
        </div>
      } />

      {/* Applicant Page */}
      <Route path="/applicant" element={
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Applicant />
          </div>
        </div>
      } />
      <Route path="/applications" element={
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Applications />
          </div>
        </div>
      } />
      
    </Routes>
    
  );
}

export default App;
