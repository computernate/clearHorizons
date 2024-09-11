import React, { useState } from 'react';
import styles from 'css/homepage/ServiceEstimateForm.module.css'
import { Link } from "react-router-dom";

const ServiceEstimateForm = () => {
  const [formData, setFormData] = useState({
    squareFeet: '',
    floors: '',
    cleaning: false,
    window: false,
    pest: false,
    beds: '',
    baths: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const calculateCleaning = () => {
    if(!formData.cleaning) return 0
    let bathCharge = 40*formData.baths 
    let bedCharge = 27 * formData.beds 
    let mainFloorCharge = 128 
    let basementCharge = (formData.floors>10)?41:0
    let moreFloorsCharge = ((formData.floors%10) - 1) *14
    return bathCharge + bedCharge + mainFloorCharge + basementCharge + moreFloorsCharge;
  };

  const calculateWindowInterior = () => {
    if(!formData.window)return 0
    let windows = formData.squareFeet/100 + formData.squareFeet/1000
    return Math.floor((2.71*windows)*100)/100;
  };

  const calculateWindowExterior = () => {
    if(!formData.window)return 0
    let windows = formData.squareFeet/100 + formData.squareFeet/1000
    return Math.floor((5.25*windows)*100)/100;
  };

  const calculatePest = () => {
    if(!formData.pest) return 0
    if(formData.squareFeet < 2000) return 99
    if(formData.squareFeet < 4000) return 119
    if(formData.squareFeet < 5500) return 129
    return 139;
  };

  const calculateDiscount = () => {
    let discount = 0;
    if(formData.pest) discount++;
    if(formData.window) discount++;
    if(formData.cleaning) discount++;
    return 10*discount;
  };

  const calculateTotal = () => {
    let total = calculateCleaning() + calculateWindowInterior() + calculatePest() + calculateWindowExterior()
    let discount = total * calculateDiscount()/100
    return Math.floor((total - discount)*100)/100;
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.estimateForm}>
      {/* Initial Selection */}
      <h3>Get Your Service Estimate</h3>
      <form>
        <div className={styles.labelAndSelect}>
          <label for="squareFeet">
            Square Feet:
          </label>
          <select name="squareFeet" value={formData.squareFeet} onChange={handleChange}>
            <option value="">Select</option>
            <option value="500">Up to 500 sq ft</option>
            <option value="1000">500-1000 sq ft</option>
            <option value="2000">1000-2000 sq ft</option>
            <option value="3000">2000-3000 sq ft</option>
            <option value="4000">3000-4000 sq ft</option>
            <option value="5000">4000-5000 sq ft</option>
            <option value="6000">5000-6000 sq ft</option>
            <option value="7000">6000-7000 sq ft</option>
            <option value="8000">7000-8000 sq ft</option>
            <option value="9000">8000-9000 sq ft</option>
            <option value="10000">9000-10000 sq ft</option>
            <option value="11000">10000-11000 sq ft</option>
          </select>
        </div>
        <div className={styles.labelAndSelect}>
        <label for="floors">
          Number of Floors:
        </label>
          <select name="floors" value={formData.floors} onChange={handleChange}>
            <option value="">Select</option>
            <option value="1">1 floor</option>
            <option value="2">2 floors</option>
            <option value="3">3 floors</option>
            <option value="4">4+ floors</option>
            <option value="11">1 floor (+ basement)</option>
            <option value="12">2 floors (+ basement)</option>
            <option value="13">3 floors (+ basement)</option>
            <option value="14">4+ floors (+ basement)</option>
          </select>
          </div>

        <div className={styles.checkboxes}>
          <div className={styles.checkbox}>
            <img
              src="homepage/CCHhome.png"
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
              src="homepage/CCHwindow.png"
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
          <div className={styles.checkbox}>
            <img
              src="homepage/CCHpest.png"
            />
            <label>
              <input
                type="checkbox"
                name="pest"
                checked={formData.pest}
                onChange={handleChange}
              />
              Pest
            </label>
          </div>
        </div>

        {/* Detailed Selection for Cleaning */}
        {formData.cleaning && (
          <div className={`${styles.cleaningDetails} ${styles.animateDropdown}`}>
          <div className={styles.labelAndSelect}>
            <label for="beds">
              Beds:
            </label>
              <select name="beds" value={formData.beds} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5 Beds</option>
                <option value="6">6 Beds</option>
                <option value="7">7 Beds</option>
                <option value="8">8 Beds</option>
                <option value="9">9 Beds</option>
                <option value="10">10 Beds</option>
              </select>
              </div>
              <div className={styles.labelAndSelect}>
            <label for="baths">
              Baths:
            </label>
              <select name="baths" value={formData.baths} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3 Baths</option>
                <option value="4">4 Baths</option>
                <option value="5">5 Baths</option>
                <option value="6">6 Baths</option>
                <option value="7">7 Baths</option>
                <option value="8">8 Baths</option>
                <option value="9">9 Baths</option>
                <option value="10">10 Baths</option>
              </select>
              </div>
          </div>
        )}
      </form>

      {/* Estimate Table */}
      <h3>Estimate</h3>
      <table>
        <tbody>
        {(formData.cleaning && <tr>
            <td>Cleaning</td>
            <td>${calculateCleaning()}</td>
          </tr>)}
          {(formData.window && <tr>
            <td>Window (Interior)</td>
            <td>${calculateWindowInterior()}</td>
          </tr>)}
          {(formData.window && <tr>
            <td>Window (Exterior)</td>
            <td>${calculateWindowExterior()}</td>
          </tr>)}
          {(formData.pest && <tr>
            <td>Pest</td>
            <td>${calculatePest()}</td>
          </tr>)}
          <tr>
            <td>Discount</td>
            <td>{calculateDiscount()}%</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${calculateTotal()}</td>
          </tr>
        </tbody>
      </table>
      <p>Note: <i>This is only an estimate and not a quote. <Link to="/schedule" style={styles.link}>Click here</Link> to request a real quote!</i></p>
    </div>
    </div>
  );
};

export default ServiceEstimateForm;