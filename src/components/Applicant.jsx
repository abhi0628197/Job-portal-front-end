import { useState, useEffect } from 'react';
import apiBaseUrl from '../api/apiConfig';
import './Applicant.css';

function Applicant() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState({ name: '', email: '', resume_link: '', job_id: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/jobs/`)
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error(err));
  }, []);

  const handleApply = (e) => {
    e.preventDefault();

    fetch(`${apiBaseUrl}/api/apply/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Application submitted successfully!');
        setApplication({ name: '', email: '', resume_link: '', job_id: '' });
        setSelectedJob(null); // Close modal

        // Auto-hide message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error(err);
        setMessage('Error submitting application');

        // Auto-hide message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      });
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setApplication({ ...application, job_id: job.id });
    setMessage('');
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="applicant-container">
      <h2>Available Jobs</h2>

      {/* Success/Error Message */}
      {message && (
        <p className="message">{message}</p>
      )}

      <div className="job-cards">
        {jobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => handleJobSelect(job)}>
            <h3>{job.title}</h3>
            <p><strong>{job.company_name}</strong></p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            <p className="description">{job.description}</p>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>
            <h2>Apply for: {selectedJob.title} at {selectedJob.company_name}</h2>
            <form onSubmit={handleApply} className="application-form">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={application.name}
                onChange={e => setApplication({ ...application, name: e.target.value })}
                required
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={application.email}
                onChange={e => setApplication({ ...application, email: e.target.value })}
                required
              />

              <label>Resume Link</label>
              <input
                type="url"
                placeholder="Paste your resume link"
                value={application.resume_link}
                onChange={e => setApplication({ ...application, resume_link: e.target.value })}
                required
              />

              <button type="submit">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applicant;
