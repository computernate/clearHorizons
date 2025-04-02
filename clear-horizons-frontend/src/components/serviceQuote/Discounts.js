import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/Discounts.module.css'
const API_URL = process.env.REACT_APP_API_URL;


const Discounts = ({ data, onNext }) => {
  const [jobFrequencies, setJobFrequencies] = useState({});
  const [selectedFrequencies, setSelectedFrequencies] = useState({});

  useEffect(() => {
    const jobTypeIds = data.map(item => item.identifier.id);
    if (jobTypeIds.length === 0) return;
    fetch(API_URL + 'price_configurations/api/job_type_frequencies/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_types: jobTypeIds })
    })
      .then(res => res.json())
      .then(response => {
        const frequencies = response.reduce((acc, job) => {
          acc[job.id] = job;
          return acc;
        }, {});
        setJobFrequencies(frequencies);
      })
      .catch(err => console.error('Error fetching job frequencies:', err));
  }, []);

  const handleFrequencyChange = (jobTypeId, selectedValue) => {
    // Find the selected frequency option from the job's frequency list.
    const frequencies = jobFrequencies[jobTypeId]?.job_frequencies || [];
    const frequency = frequencies.find(freq => freq.day_interval.toString() === selectedValue);
    setSelectedFrequencies(prev => ({
      ...prev,
      [jobTypeId]: frequency || { discount: 0 }
    }));
  };

  const calculateTotals = () => {
    let beforeTotal = 0;
    let afterTotal = 0;
    data.forEach(item => {
      const baseTotal = item.total;
      beforeTotal += baseTotal;

      const freqDiscount = selectedFrequencies[item.identifier.id]?.discount || 0;
      const bundleDiscount = data.length > 1 ? (item.type.bundle_discount || 0) : 0;
      const totalDiscount = freqDiscount + bundleDiscount;

      afterTotal += baseTotal - totalDiscount;
    });
    return { beforeTotal, afterTotal, totalDiscount: beforeTotal - afterTotal };
  };

  const totals = calculateTotals();

  const allSelected = data.every(item => {
    const frequencies = jobFrequencies[item.identifier.id]?.job_frequencies;
    // If no frequency options are available, we consider it "selected" by default.
    if (!frequencies || frequencies.length === 0) return true;
    return !!selectedFrequencies[item.identifier.id];
  });


  const handleSubmit = () => {
    if (!allSelected) return;
    onNext({
      totalDiscount: totals.totalDiscount,
      totalBefore: totals.beforeTotal,
      totalAfter: totals.afterTotal
    })
  }

  return (
    <div className={styles.wrapper}>
      <h2>DISCOUNTS</h2>
      {data.map(item => {
        const jobTypeId = item.identifier.id;
        const frequencies = jobFrequencies[jobTypeId]?.job_frequencies || [];
        return (
          <div key={jobTypeId} className={styles.discountWrapper}>
            <div className={styles.discountHeader}>
              <img src={item.identifier.logo} alt={item.identifier.name} style={{ maxWidth: '100px' }} />
              <h3>{item.identifier.name}</h3>
            </div>
            {frequencies.length ? (
              <div className="labelAndInput">
                <label>Select a frequency<span style={{ color: 'red' }}>*</span></label>
                <select
                  onChange={e => handleFrequencyChange(jobTypeId, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select frequency
                  </option>
                  {frequencies.map((freq, index) => (
                    <option key={index} value={freq.day_interval}>
                      {freq.display} (Discount: {freq.discount})
                    </option>
                  ))}
                </select>

              </div>
            ) : (
              <p>No frequency options available</p>
            )}
            <table>
              {data.length > 1 && (
                <tr>
                  <td>Bundle Discount</td>
                  <td>${item.type.bundle_discount || 0}</td>
                </tr>
              )}
              <tr>
                <td>Frequency Discount</td> <td>${selectedFrequencies[jobTypeId]?.discount || 0}</td>
              </tr>
              <tr>
                <td>Total Before Discounts</td> <td className={"striken"}>${item.total}</td>
              </tr>
              <tr>
                <td>Total After Discounts</td>
                <td>${item.total -
                  ((selectedFrequencies[jobTypeId]?.discount || 0) +
                    (data.length > 1 ? (item.type.bundle_discount || 0) : 0))}
                </td>
              </tr>
            </table>
          </div>
        );
      })}
      <div className={styles.discountWrapper}>
        <h2>Overall Totals</h2>
        <table>
          <tr>
            <td>Total Discount</td>
            <td>${totals.totalDiscount}</td>
          </tr>
          <tr>
            <td>Before Discount</td>
            <td className={"striken"}>${totals.beforeTotal}</td>
          </tr>
          <tr>
            <td>After Discount</td>
            <td>${totals.afterTotal}</td>
          </tr>
        </table>
        <button className={!allSelected ? "disabled" : ""} onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default Discounts;