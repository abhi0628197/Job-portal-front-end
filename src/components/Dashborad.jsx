import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiBaseUrl from '../api/apiConfig';
import { Briefcase, Building, PlusCircle } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const role = localStorage.getItem('role');
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'recruiter') {
      fetch(`${apiBaseUrl}/api/jobs/`)
        .then(res => res.json())
        .then(data => {
          setTotalJobs(data.jobs.length);
          const companies = new Set(data.jobs.map(job => job.company_name));
          setTotalCompanies(companies.size);
        })
        .catch(err => console.error(err));
    }
  }, [role]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>

      {role === 'recruiter' && (
        <div className="summary-cards">
          <div className="card">
            <Briefcase size={48} color="#4CAF50" />
            <h2>{totalJobs}</h2>
            <p>Total Jobs Posted</p>
          </div>

          <div className="card">
            <Building size={48} color="#2196F3" />
            <h2>{totalCompanies}</h2>
            <p>Total Companies Registered</p>
          </div>
        </div>
      )}

      {role === 'recruiter' && (
        <div className="action-buttons">
          <button onClick={() => navigate('/company')}>
            <PlusCircle size={20} /> Register Company
          </button>

          <button onClick={() => navigate('/jobs')}>
            <PlusCircle size={20} /> Post Job
          </button>
        </div>
      )}

      {role === 'applicant' && (
        <p className="welcome-text">Welcome! Please explore jobs using the sidebar.</p>
      )}
    </div>
  );
}

export default Dashboard;
