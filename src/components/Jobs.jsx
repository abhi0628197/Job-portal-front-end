import { useState, useEffect } from 'react';
import { FaBuilding, FaFileAlt, FaDollarSign, FaMapMarkerAlt, FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import apiBaseUrl from '../api/apiConfig';
import './Jobs.css';

function Jobs() {
  const [job, setJob] = useState({ company_id: '', title: '', description: '', salary: '', location: '' });
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch(`${apiBaseUrl}/api/jobs/`)
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiBaseUrl}/api/post-job/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Job posted successfully!');
        setJob({ company_id: '', title: '', description: '', salary: '', location: '' });
        fetchJobs();
      })
      .catch(err => {
        console.error(err);
        setMessage('Error posting job');
      });
  };

  return (
    <div className="jobs-container">
      <h2><FaBriefcase style={{ marginRight: '10px' }} /> Post Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label><FaBuilding style={{ marginRight: '8px' }} /> Company ID</label>
        <input
          type="text"
          placeholder="Enter Company ID"
          value={job.company_id}
          onChange={e => setJob({ ...job, company_id: e.target.value })}
          required
        />

        <label><FaBriefcase style={{ marginRight: '8px' }} /> Job Title</label>
        <input
          type="text"
          placeholder="Enter Job Title"
          value={job.title}
          onChange={e => setJob({ ...job, title: e.target.value })}
          required
        />

        <label><FaFileAlt style={{ marginRight: '8px' }} /> Description</label>
        <textarea
          placeholder="Enter Job Description"
          value={job.description}
          onChange={e => setJob({ ...job, description: e.target.value })}
          required
        />

        <label><FaDollarSign style={{ marginRight: '8px' }} /> Salary</label>
        <input
          type="number"
          placeholder="Enter Salary"
          value={job.salary}
          onChange={e => setJob({ ...job, salary: e.target.value })}
          required
        />

        <label><FaMapMarkerAlt style={{ marginRight: '8px' }} /> Location</label>
        <input
          type="text"
          placeholder="Enter Job Location"
          value={job.location}
          onChange={e => setJob({ ...job, location: e.target.value })}
          required
        />

        <button type="submit"><FaCheckCircle style={{ marginRight: '8px' }} /> Post Job</button>

        {message && <p className="message">{message}</p>}
      </form>

      
    </div>
  );
}

export default Jobs;
