import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaBriefcase, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Job Portal</h2>
      <nav className="menu">
        {role === 'recruiter' && (
          <>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              <FaHome className="icon" /> Home
            </Link>
            <Link to="/company" className={location.pathname === '/company' ? 'active' : ''}>
              <FaBuilding className="icon" /> Register Company
            </Link>
            <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
              <FaBriefcase className="icon" /> Post Jobs
            </Link>
            <Link to="/applications" className={location.pathname === '/applications' ? 'active' : ''}>
              <FaUsers className="icon" /> Applicants
            </Link>
          </>
        )}
        {role === 'applicant' && (
          <Link to="/applicant" className={location.pathname === '/applicant' ? 'active' : ''}>
            <FaBriefcase className="icon" /> Jobs
          </Link>
        )}
      </nav>

      <div className="logout-section">
        <button onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
