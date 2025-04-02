import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/SelectServices.module.css';
import InputMask from 'react-input-mask';
const API_URL = process.env.REACT_APP_API_URL;

const SubmitForm = ({ data, className, nextStep }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [totals, setTotals] = useState({ totalBefore: '', totalAfter: '' });

  // Extract totals from the data array (assumes totals object has totalBefore and totalAfter)
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const totalsObj = data.find(item => item.totalBefore !== undefined && item.totalAfter !== undefined);
      if (totalsObj) {
        setTotals({
          totalBefore: totalsObj.totalBefore,
          totalAfter: totalsObj.totalAfter,
        });
      }
    }
  }, [data]);

  const validate = () => {
    console.log(phone)
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { name, email, phone, data };

    try {
      const response = await fetch(`${API_URL}ch_base/submit-form-quote/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log("OK")
        nextStep()
      } else {
        alert("ERROR: FORM NOT SUBMITTED")
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className={`${styles.wrapper} ${className}`} onSubmit={handleSubmit}>
      <h2>Submit Quote</h2>
      <div className={"labelAndInput"}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors({ ...errors, name: '' });
          }}
          style={{ border: errors.name ? '1px solid red' : undefined }}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className={"labelAndInput"}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: '' });
          }}
          style={{ border: errors.email ? '1px solid red' : undefined }}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
            <div className={"labelAndInput"}>
              <label for="phone">
                Phone
              </label>
              <InputMask
                mask="(999) 999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maskChar="_"
               placeholder="(___) ___-____"
               name="phone"
               style={{ border: errors.phone ? "2px solid red" : "1px solid black" }}
              >
                </InputMask>
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>
      <table>
        <tr>
          <td>Total Before Discounts</td>
          <td className={"striken"}>${totals.totalBefore}</td>
        </tr>
        <tr>
          <td>Total After Discounts</td>
          <td>${totals.totalAfter}</td>
        </tr>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitForm;