import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/GenericService.module.css'
const API_URL = process.env.REACT_APP_API_URL;

function GenericService({serviceData, onNext}) {
  const [data, setData] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Fetch the configuration on mount
  useEffect(() => {
    fetch(`${API_URL}price_configurations/job_types/${serviceData.id}/`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, [serviceData]);

  // Handler for job level selection
  const handleJobLevelChange = (e) => {
    const selectedIdentifier = e.target.value;
    const level = data.job_levels.find(
      (jl) => jl.internal_identifier === selectedIdentifier
    );
    setSelectedJobLevel(level);
    setErrors((prev) => ({ ...prev, jobLevel: '' }));
  };

  // Handler for individual field changes
  const handleFieldChange = (fieldIdentifier, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [fieldIdentifier]: value,
    }));
    if (errors[fieldIdentifier]) {
      if (field.required && value.trim() !== '') {
        setErrors((prev) => ({ ...prev, [fieldIdentifier]: '' }));
      }
      if (field.type === 'number' && value !== '' && !isNaN(value)) {
        setErrors((prev) => ({ ...prev, [fieldIdentifier]: '' }));
      }
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Validate job level (always required)
    if (!selectedJobLevel) {
      newErrors.jobLevel = 'Please select a job type.';
      valid = false;
    }

    // Validate each field from the groups
    data.job_data_groups.forEach((group) => {
      group.job_datas.forEach((field) => {
        const value = formData[field.internal_identifier] || '';
        // Check required fields
        if (field.required && value.trim() === '') {
          newErrors[field.internal_identifier] = `${field.name} is required.`;
          valid = false;
        }
        // Validate number fields
        if (field.type === 'number' && value !== '' && isNaN(value)) {
          newErrors[field.internal_identifier] = `${field.name} must be a number.`;
          valid = false;
        }
      });
    });

    setErrors(newErrors);
    return valid;
  };

  // Compute the total price based on the formula:
  // (inflation * base_pay * sum(total time contributions)) + fixed_cost
  const computeTotal = () => {
    if (!selectedJobLevel || !data) return 0;
    let totalTime = 0;

    data.job_data_groups.forEach((group) => {
      group.job_datas.forEach((field) => {
        if (field.type === 'number') {
          const quantity = parseFloat(formData[field.internal_identifier] || 0);
          const priceOption = field.job_price_options.find(
            (opt) => opt.job_level === selectedJobLevel.id
          );
          if (priceOption) {
            totalTime += quantity * priceOption.time;
          }
        }
      });
    });

    return (data.inflation * data.base_pay * totalTime) + data.fixed_cost;
  };

  const handleSubmit = () =>{
    if (!validate()) return;
    onNext({
      identifier:serviceData,
      type:selectedJobLevel,
      data:formData,
      total: computeTotal()
    })
  }

  // If data hasn't loaded yet
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* Header with logo and name */}
      <div className={styles.head}>
        <img src={data.logo} alt={data.name} style={{ width: '100px' }} />
        <h1>{data.name}</h1>
      </div>

      {/* Dropdown for selecting job level */}
      <div className={"labelAndInput"}>
        <label>
          Job Type:{' '} <span style={{ color: 'red' }}>*</span>{' '}
          <select onChange={handleJobLevelChange}>
            <option value="">Select a type</option>
            {data.job_levels.map((jl) => (
              <option key={jl.id} value={jl.internal_identifier}>
                {jl.name}
              </option>
            ))}
          </select>
        </label>
        {errors.jobLevel && (
          <div className="error" style={{ color: 'red' }}>
            {errors.jobLevel}
          </div>
        )}
        {selectedJobLevel && <p>{selectedJobLevel.description}</p>}
      </div>

      {/* Render each job data group */}
      {data.job_data_groups.map((group) => (
        <div key={group.id} className={(group.id==0)?"":styles.dropdownGroup}>
          {group.id !== 0 ? (
            // Render as a dropdown/collapsible group
            <details>
              <summary>{group.name}</summary>
              {group.image && (
                <div>
                  <img src={group.image} alt={group.name} style={{ width: '50px' }} />
                </div>
              )}
              {group.description && <p>{group.description}</p>}
              {group.job_datas.map((field) => (
                <div key={field.id} className={"labelAndInput"}>
                  <label>{field.name}:{field.required && <span style={{ color: 'red' }}>*</span>}</label>
                  {field.type === 'select' ? (
                    <select
                      onChange={(e) =>
                        handleFieldChange(field.internal_identifier, e.target.value, field)
                      }
                      style={
                        errors[field.internal_identifier]
                          ? { border: '1px solid red' }
                          : {}
                      }
                    >
                      <option value="">Select...</option>
                      {field.job_data_select_options.map((opt) => (
                        <option key={opt.id} value={opt.value}>
                          {opt.display}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      onChange={(e) =>
                        handleFieldChange(field.internal_identifier, e.target.value, field)
                      }
                      style={
                        errors[field.internal_identifier]
                          ? { border: '1px solid red' }
                          : {}
                      }
                    />
                  )}
                  {errors[field.internal_identifier] && (
                    <div className="error" style={{ color: 'red' }}>
                      {errors[field.internal_identifier]}
                    </div>
                  )}
                </div>
              ))}
            </details>
          ) : (
            // If group id is 0, render fields ungrouped
            <div>
              {group.job_datas.map((field) => (
                <div key={field.id} className={"labelAndInput"}>
                  <label>{field.name}:{field.required && <span style={{ color: 'red' }}>*</span>}</label>
                  {field.type === 'select' ? (
                    <select
                      onChange={(e) =>
                        handleFieldChange(field.internal_identifier, e.target.value, field)
                      }
                      style={
                        errors[field.internal_identifier]
                          ? { border: '1px solid red' }
                          : {}
                      }
                    >
                      <option value="">Select...</option>
                      {field.job_data_select_options.map((opt) => (
                        <option key={opt.id} value={opt.value}>
                          {opt.display}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      onChange={(e) =>
                        handleFieldChange(field.internal_identifier, e.target.value, field)
                      }
                      style={
                        errors[field.internal_identifier]
                          ? { border: '1px solid red' }
                          : {}
                      }
                    />
                  )}
                  {errors[field.internal_identifier] && (
                    <div className="error" style={{ color: 'red' }}>
                      {errors[field.internal_identifier]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Total price calculation */}
      <table>
        <tbody>
          <tr>
            <td>Total:</td>
            <td>{computeTotal()}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>NEXT</button>
    </div>
  );
}

export default GenericService;