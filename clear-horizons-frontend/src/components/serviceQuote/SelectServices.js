import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/SelectServices.module.css'
const API_URL = process.env.REACT_APP_API_URL;

const SelectServices = ({ setData, className }) => {
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTypeSelections, setJobTypeSelections] = useState({});

  const handleToggle = (id) => {
    setJobTypeSelections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetch(API_URL+'price_configurations/job_types/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job types');
        }
        return response.json();
      })
      .then(data => {
        setJobTypes(data);
        const initialSelections = {};
        data.forEach((job) => {
          initialSelections[job.id] = false;
        });
        setJobTypeSelections(initialSelections);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const selectedCount = Object.values(jobTypeSelections).filter(Boolean).length;
  let offerMessage = "Click to select a service";
  if (selectedCount === 1) {
    offerMessage = "Select both services to receive $50 OFF EACH";
  } else if (selectedCount >= 2) {
    offerMessage = "You qualify for $50 off each service!";
  }

  const offerClassName = `${styles.jobType} ${selectedCount >= 2 ? styles.selected : ''}`;

  const handleSubmit = () => {
    const selectedCount = Object.values(jobTypeSelections).filter(Boolean).length;
    if (selectedCount === 0) return;
    const selectedJobTypes = jobTypes.filter(job => jobTypeSelections[job.id]);
    setData(selectedJobTypes);
  };

  if (loading) return <p>Loading job types...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.wrapper}>
        <h2>SERVICES</h2>
        {jobTypes.map(job => (
          <div key={job.id} 
            className={`${styles.jobType} ${jobTypeSelections[job.id] ? styles.selected : ''}`}
            onClick={() => handleToggle(job.id)}>
            {job.logo && <img src={job.logo} alt={job.name} width="100" />}
            <h3>{job.name}</h3>
          </div>
        ))}
        <div className={offerClassName}>
          <h3>{offerMessage}</h3>
        </div>
        <button onClick={handleSubmit} className={(selectedCount==0)?"disabled":""}>NEXT</button>
    </div>
  );
};

export default SelectServices;