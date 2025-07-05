import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      navigate('/dashboard'); // Automatically go to dashboard if role is already selected
    }
  }, [navigate]);

  const handleRoleSelection = (role) => {
    localStorage.setItem('role', role);
    navigate('/dashboard');
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the Job Portal</h1>
      <p>Select your role to continue</p>
      <div className="landing-buttons">
        <button onClick={() => handleRoleSelection('recruiter')}>I am a Recruiter</button>
        <button onClick={() => handleRoleSelection('applicant')}>I am an Applicant</button>
      </div>
    </div>
  );
}

export default LandingPage;
