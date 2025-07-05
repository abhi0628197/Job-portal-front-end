import { useState, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaEye } from 'react-icons/fa';
import apiBaseUrl from '../api/apiConfig';
import './Applications.css';

function Applications() {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/jobs/`)
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(err => console.error(err));
  }, []);

  const fetchApplicants = (jobId, jobTitle) => {
    fetch(`${apiBaseUrl}/api/applicants/${jobId}/`)
      .then(res => res.json())
      .then(data => {
        setApplicants(data.applicants);
        setSelectedJobTitle(jobTitle);
        setIsModalOpen(true);
      })
      .catch(err => console.error(err));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setApplicants([]);
    setSelectedJobTitle('');
  };

  return (
    <div className="applications-container">
      <header className="applications-header">
        <h1>Job Applications</h1>
        <p>Manage and review applications for your job postings</p>
      </header>

      <section className="active-jobs-section">
        <div className="job-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-details">
                <p><FaBuilding /> {job.company_name}</p>
                <p><FaMapMarkerAlt /> {job.location}</p>
              </div>
              <p className="applicants-count"><FaUsers /> {job.applicants_count} applicants</p>
              <button
                className="view-applications-btn"
                onClick={() => fetchApplicants(job.id, job.title)}
              >
                <FaEye /> View Applications
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Proper Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Applicants for: {selectedJobTitle}</h2>
              <button className="modal-close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
  {applicants.length === 0 ? (
    <p>No applicants for this job yet.</p>
  ) : (
    <ul className="applicant-list">
      {applicants.map((applicant, index) => (
        <li key={index} className="applicant-card">
          <div className="applicant-info">
            <h4>{applicant.name}</h4>
            <p>{applicant.email}</p>
            <p className="applied-date">Applied on: {new Date(applicant.applied_at).toLocaleDateString()}</p>
          </div>
          <a
            href={applicant.resume_link}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            View Resume
          </a>
        </li>
      ))}
    </ul>
  )}
</div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
