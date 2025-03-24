import React, { useState } from 'react';
import styles from 'css/homepage/ServiceEstimateForm.module.css'
import { Link } from "react-router-dom";
import cchHome from "assets/homepage/CCHhome.png"
import cchWindow from "assets/homepage/CCHwindow.png"

const ServiceEstimateForm = () => {
  const [formData, setFormData] = useState({
    cleaning: false,
    window: false,
    windowIn:true,
    windowEx:true,
    windowInFreq:'monthly',
    windowExFreq:'monthly',
    cleaningFreq:'weekly'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const calculateCleaningDiscount = () => {
    if(formData.cleaning && formData.cleaningFreq=='monthly') return 50
    if(formData.cleaning && formData.cleaningFreq=='bi-monthly') return 100
    if(formData.cleaning && formData.cleaningFreq=='weekly') return 150
    return 0
  }
  const cleaningDiscount = calculateCleaningDiscount();

  const calculateWindowDiscount = () => {
    let winDiscount=0
    if(formData.window && formData.windowIn && formData.windowEx){
      if(formData.window && formData.windowExFreq=='bi-annually') return 50
      if(formData.window && formData.windowExFreq=='quarterly') return 100
      if(formData.window && formData.windowExFreq=='monthly') return 150
    }
    if(formData.window && formData.windowIn && !formData.windowEx){
      if(formData.window && formData.windowExFreq=='bi-annually') return 25
      if(formData.window && formData.windowExFreq=='quarterly') return 50
      if(formData.window && formData.windowExFreq=='monthly') return 75
    }
    if(formData.window && !formData.windowIn && formData.windowEx){
      if(formData.window && formData.windowInFreq=='bi-annually') return 25
      if(formData.window && formData.windowInFreq=='quarterly') return 50
      if(formData.window && formData.windowInFreq=='monthly') return 75
    }
    return winDiscount
  }
  const windowDiscount = calculateWindowDiscount();

  const calculateTotalDiscount = () =>{
    let discount = calculateWindowDiscount() + calculateCleaningDiscount()
    if(formData.window && formData.cleaning) discount += 50
    return discount
  }
  const totalDiscount = calculateTotalDiscount()


  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>

    <div className={styles.description}>
      <h3>See your discounts</h3>
      <p>Use our estimator form to see how much you could SAVE! </p>
    </div>
    <div className={styles.estimateForm}>
      {/* Initial Selection */}
      <form>
        <div className={styles.checkboxes}>
          <div className={styles.checkbox}>
            <img
              src={cchHome}
            />
            <label>
              <input
                  type="checkbox"
                  name="cleaning"
                  checked={formData.cleaning}
                  onChange={handleChange}
                />
              Cleaning
            </label>
          </div>
          <div className={styles.checkbox}>
            <img
              src={cchWindow}
            />
            <label>
              <input
                type="checkbox"
                name="window"
                checked={formData.window}
                onChange={handleChange}
              />
              Window
            </label>
          </div>
        </div>

        
      {/* Window */}
      {formData.window && (
        <div className={styles.checkboxes}>
        <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                name="windowEx"
                checked={formData.windowEx}
                onChange={handleChange}
              />
              Exterior Window Cleaning
            </label>
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                  type="checkbox"
                  name="windowIn"
                  checked={formData.windowIn}
                  onChange={handleChange}
                />
              Interior Window cleaning
            </label>
          </div>
        </div>
      )}

          
      {formData.window && formData.windowEx && (
            <div className={styles.estimateWrap}>
                <div className={styles.labelAndSelect}>
                  <label for="windowExFreq">
                    Window Cleaning Frequency (Exterior):
                  </label>
                  <select 
                    name="windowExFreq" value={formData.windowExFreq}
                    onChange={handleChange}>
                    <option value="">Select (GET DISCOUNTS!)</option>
                    <option value="one-time">One time ($0 OFF)</option>
                    <option value="bi-annually">Bi-Annually ($25 OFF PER CLEANING)</option>
                    <option value="quarterly">Quarterly ($50 OFF PER CLEANING)</option>
                    <option value="monthly">Monthly ($75 OFF PER CLEANING)</option>
                  </select>
                </div>
            </div>
          )}
          
          {formData.window && formData.windowIn && (
            <div className={styles.estimateWrap}>
                <div className={styles.labelAndSelect}>
                  <label for="windowInFreq">
                    Window Cleaning Frequency (Interior):
                  </label>
                  <select 
                    name="windowInFreq" value={formData.windowInFreq}
                    onChange={handleChange}>
                    <option value="">Select (GET DISCOUNTS!)</option>
                    <option value="one-time">One time (SAME AS EXTERIOR)</option>
                    <option value="bi-annually">Bi-Annually (SAME AS EXTERIOR)</option>
                    <option value="quarterly">Quarterly (SAME AS EXTERIOR)</option>
                    <option value="monthly">Monthly (SAME AS EXTERIOR)</option>
                  </select>
                </div>
            </div>
          )}
          
        {formData.cleaning && (
          <div className={styles.estimateWrap}>
              <div className={styles.labelAndSelect}>
                <label for="cleaningFreq">
                  Cleaning Frequency:
                </label>
                <select 
                name="cleaningFreq" value={formData.cleaningFreq}
                 onChange={handleChange}>
                  <option value="">Select (GET DISCOUNTS!)</option>
                  <option value="one-time">One time ($0 OFF)</option>
                  <option value="monthly">Monthly ($50 OFF PER CLEANING)</option>
                  <option value="bi-monthly">Bi-Monthly ($100 OFF PER CLEANING)</option>
                  <option value="weekly">Weekly ($150 OFF PER CLEANING)</option>
                </select>
              </div>
          </div>
        )}
      </form>

      {/* Estimate Table */}
      <h3>Estimate</h3>
      <table>
        <tbody>
          {formData.window && formData.cleaning && (<tr>
            <td>Bundle Discount</td>
            <td>-$50.00</td>
          </tr>)}
          {formData.cleaning &&(cleaningDiscount > 0 && <tr>
            <td>Cleaning Frequency Discount</td>
            <td>-${cleaningDiscount}.00</td>
          </tr>)}
          {formData.window &&(windowDiscount > 0 && <tr>
            <td>Window Frequency Discount</td>
            <td>-${windowDiscount}.00</td>
          </tr>)}
          <tr>
            <td>Total</td>
            <td>-${totalDiscount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <p>Note: <i>This is only an estimate and not a quote. <Link to="/schedule" style={styles.link}>Click here</Link> to request a real quote!</i></p>
    </div>
      </div>
      </div>
  );
};

export default ServiceEstimateForm;