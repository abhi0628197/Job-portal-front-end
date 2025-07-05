import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaRegFileAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import apiBaseUrl from '../api/apiConfig';
import './Company.css';

function Company() {
  const [company, setCompany] = useState({ name: '', location: '', description: '' });
  const [companyId, setCompanyId] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiBaseUrl}/api/create-company/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    })
      .then(res => res.json())
      .then(data => {
        if (data.company_id && data.message) {
          setCompanyId(data.company_id);
          setMessage(data.message);

          localStorage.setItem('company_id', data.company_id);
        } else {
          setMessage('Error: Company ID not returned.');
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Error creating company.');
      });
  };

  return (
    <div className="company-container">
      <h2><FaBuilding style={{ marginRight: '10px' }} /> Register Company</h2>
      <form onSubmit={handleSubmit} className="company-form">
        <label><FaBuilding style={{ marginRight: '8px' }} /> Company Name</label>
        <input
          type="text"
          placeholder="Enter company name"
          value={company.name}
          onChange={e => setCompany({ ...company, name: e.target.value })}
          required
        />

        <label><FaMapMarkerAlt style={{ marginRight: '8px' }} /> Location</label>
        <input
          type="text"
          placeholder="Enter location"
          value={company.location}
          onChange={e => setCompany({ ...company, location: e.target.value })}
          required
        />

        <label><FaRegFileAlt style={{ marginRight: '8px' }} /> Description</label>
        <textarea
          placeholder="Enter description"
          value={company.description}
          onChange={e => setCompany({ ...company, description: e.target.value })}
          required
        />

        <button type="submit"><FaCheckCircle style={{ marginRight: '8px' }} /> Register Company</button>

        {message && (
          <p className="message">
            {message} <br />
            {companyId && `Company ID: ${companyId}`}
          </p>
        )}
      </form>

      <div className="already-registered">
        <p>Already Registered?</p>
        <button onClick={() => navigate('/jobs')}>
          Go to Post Job <FaArrowRight style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
}

export default Company;
