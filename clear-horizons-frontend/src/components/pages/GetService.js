import React, { useState, useEffect, useMemo } from 'react';
import styles from 'css/homepage/ServiceEstimateForm.module.css'
import { Link } from "react-router-dom";
import cchHome from 'assets/homepage/CCHhome.png'
import cchWindow from 'assets/homepage/CCHwindow.png'

const GetService = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    squareFeet: '',
    mainFloor:true,
    basement:false,
    secondFloor:false,
    cleaningService: false,
    window: false,
    homeDetail: false,
    windowDetail: false,
    deepCleaning: false,
    pest: false,
    cleaning:{
      beds:0,
      fullBath:0,
      masterBath:0,
      halfBath:0,
      kitchen:1,
      diningRoom:0,
      familyRoom:0,
      livingRoom:0,
      office:0,
      mudRoom:0,
      laundryRoom:0,
      gym:0,
      staircase:0,
      homeTheater:0,
      gameRoom:0,
      storageRoom:0,
      oven:0,
      fridge:0,
      other:0,
    },
    beds_temp: 0,
    baths_temp: 0,
    ovenCleaning: false,
    fridgeCleaning: false,
    specialInstructions: '',
    groundFloorWindows: 0,
    highWindows: 0,
    wellWindows: 0,
    frenchWindows: 0,
    highFrenchWindows: 0,
    wellFrenchWindows: 0,
    windowInterior: true,
    windowExterior: true,
    screens: 0,
    hardWater: false,
    noWFP: false,
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    cleaning_frequency:'',
    window_frequency:''
  });
  const [errors, setErrors] = useState({});
  const [discountMessage, setDiscountMessage] = useState('')


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let additional_change=formData.cleaning
    if(name=='basement' && checked){
      additional_change.staircase++
      additional_change.familyRoom++
    }
    if(name=='basement' && !checked){
      additional_change.staircase=Math.max(0,additional_change.staircase-1)
      additional_change.familyRoom=Math.max(0,additional_change.familyRoom-1)
    }
    if(name=='mainFloor' && checked){
      additional_change.kitchen++
      additional_change.diningRoom++
      additional_change.familyRoom++
      additional_change.livingRoom++
      additional_change.office++
    }
    if(name=='mainFloor' && !checked){
      additional_change.kitchen=Math.max(0,additional_change.kitchen-1)
      additional_change.diningRoom=Math.max(0,additional_change.diningRoom-1)
      additional_change.familyRoom=Math.max(0,additional_change.familyRoom-1)
      additional_change.livingRoom=Math.max(0,additional_change.livingRoom-1)
      additional_change.office=Math.max(0,additional_change.office-1)
    }
    if(name=='secondFloor' && checked){
      additional_change.staircase++
    }
    if(name=='secondFloor' && !checked){
      additional_change.staircase=Math.max(0,additional_change.staircase-1)
    }
    setFormData({
      ...formData,
      cleaning: additional_change,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleCleaningChange = (e) => {
    const { name, value, type, checked } = e.target;
    let trueValue=value
    if(!value) trueValue=0
    setFormData((prevFormData) => ({ 
      ...prevFormData,
      cleaning: {
        ...prevFormData.cleaning,
        [name]: type === 'checkbox' ? checked : trueValue,
      },
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.clientName.trim()) newErrors.clientName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.squareFeet.trim()) newErrors.squareFeet = "This is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "This is required";
    if (!formData.city.trim()) newErrors.city = "This is required";
    if (!formData.state.trim()) newErrors.state = "This is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "This is required";
    if (formData.cleaningService && !formData.cleaning_frequency.trim()) newErrors.cleaning_frequency = "This is required";
    if (formData.window &&!formData.window_frequency.trim()) newErrors.window_frequency = "This is required";
    return newErrors;
  };

  const handleDetailedChange = (e) => {

    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked)
    let additional_change=formData.cleaning
    if(name=="beds_temp"){
      additional_change.beds=value
    }
    if(name=="baths_temp"){
      additional_change.masterBath=1
      additional_change.fullBath=value-1
    }
    setFormData({
      ...formData,
      cleaning: additional_change,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const calculateCleaningTime = () => {
    if(formData.deepCleaning){
      let bed = .67 * formData.cleaning.beds
      let fullBath = 1 * formData.cleaning.fullBath
      let masterBath = 1.25 * formData.cleaning.masterBath
      let halfBath = .58 * formData.cleaning.halfBath
      let kitchen = 1.25 * formData.cleaning.kitchen
      let diningRoom = .67 * formData.cleaning.diningRoom
      let familyRoom = .67 * formData.cleaning.familyRoom
      let livingRoom = .67 * formData.cleaning.livingRoom
      let office = .58 * formData.cleaning.office
      let mudRoom = .5 * formData.cleaning.mudRoom
      let laundryRoom = .5 * formData.cleaning.laundryRoom
      let gym = .75 * formData.cleaning.gym
      let staircase = .42 * formData.cleaning.staircase
      let homeTheater = .75 * formData.cleaning.homeTheater
      let gameRoom = .75 * formData.cleaning.gameRoom
      let storageRoom = .42 * formData.cleaning.storageRoom
      let oven = 1 * formData.cleaning.oven
      let fridge = 1 * formData.cleaning.fridge
      let other = .5 * formData.cleaning.other
      return bed + fullBath + masterBath + halfBath + kitchen + diningRoom + familyRoom + livingRoom + office + 
      mudRoom + laundryRoom + gym + staircase + homeTheater + gameRoom + storageRoom + oven + fridge + other
    }
    else{
      let bed = .33 * formData.cleaning.beds
      let fullBath = .67 * formData.cleaning.fullBath
      let masterBath = .83 * formData.cleaning.masterBath
      let halfBath = .33 * formData.cleaning.halfBath
      let kitchen = .83 * formData.cleaning.kitchen
      let diningRoom = .33 * formData.cleaning.diningRoom
      let familyRoom = .33 * formData.cleaning.familyRoom
      let livingRoom = .33 * formData.cleaning.livingRoom
      let office = .33 * formData.cleaning.office
      let mudRoom = .25 * formData.cleaning.mudRoom
      let laundryRoom = .25 * formData.cleaning.laundryRoom
      let gym = .50 * formData.cleaning.gym
      let staircase = .17 * formData.cleaning.staircase
      let homeTheater = .42 * formData.cleaning.homeTheater
      let gameRoom = .42 * formData.cleaning.gameRoom
      let storageRoom = .17 * formData.cleaning.storageRoom
      let oven = 1 * formData.cleaning.oven
      let fridge = 1 * formData.cleaning.fridge
      let other = .25 * formData.cleaning.other
      return bed + fullBath + masterBath + halfBath + kitchen + diningRoom + familyRoom + livingRoom + office + 
      mudRoom + laundryRoom + gym + staircase + homeTheater + gameRoom + storageRoom + oven + fridge + other
    }
  }

  const calculateCleaning = () => {
    if(!formData.cleaningService) return 0
    let hourly_rate = 50;
    let inflation_rate = 1.25;
    if (!formData.cleaning) return 0
    let total_time = calculateCleaningTime()
    return Math.ceil(total_time * hourly_rate * inflation_rate);
  };

  const calculateWindowInteriorTime = () => {
    let actual_ground_floor = Number(formData.groundFloorWindows) + (.8 * formData.highWindows)
    let actual_high = 0.2 * formData.highWindows
    let actual_ground_floor_french = Number(formData.frenchWindows) + (.8 * formData.highFrenchWindows)
    let actual_high_french = 0.2 * formData.highFrenchWindows
    let total_time = (0.05 * formData.wellWindows) + (0.05 * actual_ground_floor) + (0.08 * actual_high)
    total_time += (0.12 * actual_ground_floor_french) + (0.17 * actual_high_french) + (0.12 * formData.wellFrenchWindows)
    return total_time
  }

  const calculateWindowInterior = () => {
    if (!formData.window || !formData.windowInterior) return 0;
    let hourly_rate = 50;
    let inflation_rate = 1.25;
    let total_time = calculateWindowInteriorTime()
    return Math.ceil(total_time * hourly_rate * inflation_rate)
  };

  const calculateWindowExteriorTime = () => {
    let total_time = (0.08 * formData.wellWindows) + (0.05*formData.groundFloorWindows) + (0.08*formData.highWindows)
    total_time += (0.12 * formData.frenchWindows) + (0.17 * formData.highFrenchWindows) + (0.17 * formData.wellFrenchWindows)
    return total_time
  }

  const calculateWindowExterior = () => {
    if (!formData.window || !formData.windowExterior) return 0;
    let hourly_rate = 50;
    let inflation_rate = 1.25;
    let total_time = calculateWindowExteriorTime()
    return Math.ceil(total_time * hourly_rate * inflation_rate)
  };

  const calculatePest = () => {
    if (!formData.pest) return 0
    if (formData.squareFeet < 2000) return 99
    if (formData.squareFeet < 4000) return 119
    if (formData.squareFeet < 5500) return 129
    return 139;
  };

  const calculateDiscount = () => {
    let discount = 0; 
    discount += calculateCleaningDiscount()
    discount += calculateWindowDiscount()
    discount += calculateBundleDiscount()

    return discount;
  };

  const calculateCleaningDiscount = () => {
    if(formData.cleaningService && formData.cleaning_frequency=='monthly') return 50
    if(formData.cleaningService && formData.cleaning_frequency=='bi-monthly') return 100
    if(formData.cleaningService && formData.cleaning_frequency=='weekly') return 150
    return 0
  }
  const calculateWindowDiscount = () => {
    if(formData.window && formData.window_frequency=='bi-annually') return 50
    if(formData.window && formData.window_frequency=='quarterly') return 100
    if(formData.window && formData.window_frequency=='monthly') return 150
    return 0
  }

  const calculateBundleDiscount = () =>{
    if(formData.window && formData.cleaningService){
      let pre_total = calculateCleaning() + calculateWindowInterior() + calculatePest() + calculateWindowExterior() - calculateCleaningDiscount() - calculateWindowDiscount()
      return Math.floor(pre_total * 0.2)
    }
    return 0
  }

  const cleaningDiscount = calculateCleaningDiscount();
  const windowDiscount = calculateWindowDiscount();
  const bundleDiscount = calculateBundleDiscount();
  const discount = calculateDiscount();

  const totalGross = useMemo(() => 
    calculateCleaning() + calculateWindowInterior() + calculatePest() + calculateWindowExterior(),
    [calculateCleaning, calculateWindowInterior, calculatePest, calculateWindowExterior]
  );

  const total = useMemo(() => {
    return totalGross < discount * 2 ? totalGross : totalGross - discount;
  }, [totalGross, discount]);


  useEffect(() => {
    if (totalGross < discount * 2) {
      setDiscountMessage("This order is too small to count for this discount");
    } else {
      setDiscountMessage("");
    }
  }, [totalGross, discount]);

  function getCSRFToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return
    } 
    try {
      const updatedData = {
        ...formData,
        totals:{
          windowInterior: calculateWindowInterior(),
          windowExterior: calculateWindowExterior(),
          cleaning: calculateCleaning(),
          total: total,
          windowInteriorTime: calculateWindowInteriorTime(),
          windowExteriorTime: calculateWindowExteriorTime(),
          cleaningTime: calculateCleaningTime(),
        }
      }
      const response = await fetch('/ch_base/submit-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Thank you for submitting through Clear Horizon! You should receive an email shortly confirming that we've recieved your request, and we will contact you to confirm specific times and details");
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.estimateForm}>
        <form>
          {/* Initial Selection */}
          <h3>Get Service</h3>
          <div className={styles.formSection}>
            <div className={styles.labelAndInput}>
              <label for="clientName">
                Name
              </label>
              <input name="clientName" value={formData.clientName}
                style={{ border: errors.clientName ? "2px solid red" : "1px solid black" }}
                onChange={handleChange} />
                {errors.clientName && <p style={{ color: "red" }}>{errors.clientName}</p>}
            </div>
            <div className={styles.labelAndInput}>
              <label for="email">
                Email
              </label>
              <input name="email" value={formData.email}
                style={{ border: errors.email ? "2px solid red" : "1px solid black" }}
                onChange={handleChange} />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className={styles.labelAndInput}>
              <label for="phone">
                Phone
              </label>
              <input name="phone" value={formData.phone}
                onChange={handleChange} />
            </div>
          </div>

          <div className={styles.formSection}>

            <div className={styles.checkboxes}>
              <div className={styles.checkbox}>
                <img
                  src={cchHome}
                />
                <label>
                  <input
                    type="checkbox"
                    name="cleaningService"
                    checked={formData.cleaningService}
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
              {/* <div className={styles.checkbox}>
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
            </div> */}
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.labelAndSelect}>
              <label for="squareFeet">
                Square Feet:
              </label>
              <select 
              name="squareFeet" 
              value={formData.squareFeet} 
              style={{ border: errors.squareFeet ? "2px solid red" : "1px solid black" }}
              onChange={handleChange}
              >
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
                <label>
                  <input
                    type="checkbox"
                    name="mainFloor"
                    checked={formData.mainFloor}
                    onChange={handleChange}
                  />
                  Main Floor
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="basement"
                    checked={formData.basement}
                    onChange={handleChange}
                  />
                  Basement
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="secondFloor"
                    checked={formData.secondFloor}
                    onChange={handleChange}
                  />
                  Second Floor
                </label>
            </div>
          </div>

          {/* Detailed Selection for Cleaning */}
          {formData.cleaningService && (
            <div className={`${styles.formSection} ${styles.animateDropdown}`}>
              <img src={cchHome} />
              <div className={styles.labelAndSelect}>
                <label for="beds">
                  Beds:
                </label>
                <select 
                name="beds_temp" value={formData.beds_temp} onChange={handleDetailedChange}>
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
                <select name="baths_temp" value={formData.cleaning.baths_temp} onChange={handleDetailedChange}>
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
              <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="deepCleaning"
                  checked={formData.deepCleaning}
                  onChange={handleChange}
                />
                <label>
                  Deep Cleaning
                </label>
              </div>
              <div className={styles.labelAndSelect}>
                <label for="cleaning_frequency">
                  Frequency:
                </label>
                <select 
                name="cleaning_frequency" value={formData.cleaning_frequency}
                style={{ border: errors.cleaning_frequency ? "2px solid red" : "1px solid black" }}
                 onChange={handleDetailedChange}>
                  <option value="">Select (GET DISCOUNTS!)</option>
                  <option value="one-time">One time ($0 OFF)</option>
                  <option value="monthly">Monthly ($50 OFF PER CLEANING)</option>
                  <option value="bi-monthly">Bi-Monthly ($100 OFF PER CLEANING)</option>
                  <option value="weekly">Weekly ($150 OFF PER CLEANING)</option>
                </select>
                {errors.cleaning_frequency && <p style={{ color: "red" }}>{errors.cleaning_frequency}</p>}
              </div>
              <div className={styles.labelAndCheck}>
                <input
                  id="cleaningDetails"
                  type="checkbox"
                  name="cleaningDetails"
                  checked={formData.cleaningDetails}
                  onChange={handleChange}
                  className={styles.hiddenCheckbox}
                />
                <label htmlFor="cleaningDetails" className={styles.customCheckbox}>
                  Detailed Breakdown and More Options
                </label>
              </div>
            </div>
          )}
          {formData.cleaningDetails && formData.cleaningService && (
            <div className={`${styles.cleaningDetails}`}>

              <div className={styles.labelAndInput}>
                <label for="beds">
                  Beds
                </label>
                <input name="beds" value={formData.cleaning.beds}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="fullBath">
                  Full Bath
                </label>
                <input name="fullBath" value={formData.cleaning.fullBath}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="masterBath">
                  Master Bath
                </label>
                <input name="masterBath" value={formData.cleaning.masterBath}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="halfBath">
                  Half Baths
                </label>
                <input name="halfBath" value={formData.cleaning.halfBath}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="kitchen">
                  Kitchen
                </label>
                <input name="kitchen" value={formData.cleaning.kitchen}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="diningRoom">
                  Dining Room
                </label>
                <input name="diningRoom" value={formData.cleaning.diningRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="familyRoom">
                  Family Room
                </label>
                <input name="familyRoom" value={formData.cleaning.familyRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="livingRoom">
                  Living Room
                </label>
                <input name="livingRoom" value={formData.cleaning.livingRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="office">
                  Office
                </label>
                <input name="office" value={formData.cleaning.office}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="mudRoom">
                  Mud Room
                </label>
                <input name="mudRoom" value={formData.cleaning.mudRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="laundryRoom">
                  Laundry Room
                </label>
                <input name="laundryRoom" value={formData.cleaning.laundryRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="gym">
                  Gym
                </label>
                <input name="gym" value={formData.cleaning.gym}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="staircase">
                  Staircase
                </label>
                <input name="staircase" value={formData.cleaning.staircase}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="homeTheater">
                  Home Theater
                </label>
                <input name="homeTheater" value={formData.cleaning.homeTheater}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="gameRoom">
                  Game Room
                </label>
                <input name="gameRoom" value={formData.cleaning.gameRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="storageRoom">
                  Storage Room
                </label>
                <input name="storageRoom" value={formData.cleaning.storageRoom}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="oven">
                  Oven
                </label>
                <input name="oven" value={formData.cleaning.oven}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="fridge">
                  Fridge
                </label>
                <input name="fridge" value={formData.cleaning.fridge}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="other">
                Other
                </label>
                <input name="other" value={formData.cleaning.other}
                  onChange={handleCleaningChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="specialInstructions">
                  Special Requests
                </label>
                <textarea name="specialInstructions" value={formData.specialInstructions}
                  onChange={handleCleaningChange} />
              </div>
            </div>
          )}


          {formData.window && (
            <div className={`${styles.formSection} ${styles.animateDropdown}`}>
              <img src={cchWindow} />
              <div className={styles.labelAndInput}>
                <label for="groundFloorWindows">
                  Ground Floor Windows:
                  <span className={styles.infoIcon} data-tooltip="These are windows that can be reached from a standing position (this would include windows that can be accessed from a back deck or tall ground level windows which are at least partially accessible from a standing position)">
                    ℹ️
                  </span>
                </label>
                <input name="groundFloorWindows" value={formData.groundFloorWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="highWindows">
                  2(+) story windows:
                </label>
                <input name="highWindows" value={formData.highWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="wellWindows">
                  Window Well Windows:
                  <span className={styles.infoIcon} data-tooltip="Any windows that are down in a window well, below or partially below ground level">
                    ℹ️
                  </span>
                </label>
                <input name="wellWindows" value={formData.wellWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="frenchWindows">
                  {/* TODO: Include info toast */}
                  French Pane Ground Floor:
                  <span className={styles.infoIcon} data-tooltip="French windows are windows with grids that divide the window into smaller panes of glass (also known as muntins, mullions, or divided windows)">
                    ℹ️
                  </span>
                </label>
                <input name="frenchWindows" value={formData.frenchWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="highFrenchWindows">
                  {/* TODO: Include info toast */}
                  French Pane (2+ story):
                </label>
                <input name="highFrenchWindows" value={formData.highFrenchWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndInput}>
                <label for="wellFrenchWindows">
                  {/* TODO: Include info toast */}
                  French Pane (window well):
                </label>
                <input name="wellFrenchWindows" value={formData.wellFrenchWindows}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="windowInterior"
                  checked={formData.windowInterior}
                  onChange={handleChange}
                />
                <label for="windowInterior">
                  Interior
                </label>
              </div>
              <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="windowExterior"
                  checked={formData.windowExterior}
                  onChange={handleChange}
                />
                <label for="windowExterior">
                  Exterior
                </label>
              </div>
              {/* <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="windowDetail"
                  checked={formData.windowDetail}
                  onChange={handleChange}
                />
                <label for="windowDetail">
                  See More Options
                </label>
              </div> */}
              
          {formData.windowDetail && (
            <div className={`${styles.cleaningDetails}`}>

              <div className={styles.labelAndInput}>
                <label for="screens">
                  Screens:
                </label>
                <input name="screens" value={formData.screens}
                  onChange={handleChange} />
              </div>
              <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="hardWater"
                  checked={formData.hardWater}
                  onChange={handleChange}
                />
                <label for="hardWater">
                  I have hard water stains
                </label>
              </div>
              <div className={styles.labelAndCheck}>
                <input
                  type="checkbox"
                  name="noWFP"
                  checked={formData.noWFP}
                  onChange={handleChange}
                />
                <label for="noWFP">
                  I don't want to use Water Fed Pole
                </label>
              </div>
            </div>
          )}
          <div className={styles.labelAndSelect}>
            <label for="window_frequency">
              Frequency:
            </label>
            <select 
            name="window_frequency" value={formData.window_frequency} 
            style={{ border: errors.window_frequency ? "2px solid red" : "1px solid black" }}
            onChange={handleDetailedChange}>
              <option value="">Select (GET DISCOUNTS!)</option>
              <option value="one-time">One time ($0 OFF)</option>
              <option value="bi-annually">Bi-Annually ($50 OFF PER CLEANING)</option>
              <option value="quarterly">Quarterly ($100 OFF PER CLEANING)</option>
              <option value="monthly">Monthly ($150 OFF PER CLEANING)</option>
            </select>
            {errors.window_frequency && <p style={{ color: "red" }}>{errors.window_frequency}</p>}
          </div>
            </div>
          )}
        </form>


        {/* Address */}
        <div className={styles.address}>
          <div className={styles.labelAndInput}>
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              style={{ border: errors.streetAddress ? "2px solid red" : "1px solid black" }}
              onChange={handleChange}
              placeholder="123 Main St"
            />
              {errors.streetAddress && <p style={{ color: "red" }}>{errors.streetAddress}</p>}
          </div>

          <div className={styles.labelAndInput}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              style={{ border: errors.city ? "2px solid red" : "1px solid black" }}
              onChange={handleChange}
              placeholder="City"
            />
                {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
          </div>

          <div className={styles.labelAndInput}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              style={{ border: errors.state ? "2px solid red" : "1px solid black" }}
              onChange={handleChange}
              placeholder="State"
            />
                {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
          </div>

          <div className={styles.labelAndInput}>
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              style={{ border: errors.zipCode ? "2px solid red" : "1px solid black" }}
              onChange={handleChange}
              placeholder="12345"
            />
                {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
          </div>
        </div>

        <div className={styles.labelAndSelect}>
          <label for="besttime">
            Best time to come (we will contact you for an exact time):
          </label>
          <select name="besttime" value={formData.baths} onChange={handleChange}>
            <option value="0">Sunday (morning)</option>
            <option value="1">Sunday (afternoon)</option>
            <option value="2">Sunday (evening)</option>
            <option value="3">Monday (morning)</option>
            <option value="4">Monday (afternoon)</option>
            <option value="5">Monday (evening)</option>
            <option value="6">Tuesday (morning)</option>
            <option value="7">Tuesday (afternoon)</option>
            <option value="8">Tuesday (evening)</option>
            <option value="9">Wednesday (morning)</option>
            <option value="10">Wednesday (afternoon)</option>
            <option value="11">Wednesday (evening)</option>
            <option value="12">Thursday (morning)</option>
            <option value="13">Thursday (afternoon)</option>
            <option value="14">Thursday (evening)</option>
            <option value="15">Friday (morning)</option>
            <option value="16">Friday (afternoon)</option>
            <option value="17">Friday (evening)</option>
            <option value="18">Saturday (morning)</option>
            <option value="19">Saturday (afternoon)</option>
            <option value="20">Saturday (evening)</option>
          </select>
        </div>

        {/* Estimate Table */}
        <h3>Quote</h3>
        <table>
          <tbody>
            {(formData.cleaningService && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Cleaning</td>
              <td>${calculateCleaning().toFixed(2)}</td>
            </tr>)}
            {(cleaningDiscount && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Cleaning Frequency Discount</td>
              <td>-${cleaningDiscount}.00</td>
            </tr>)}
            {(formData.cleaningService && <tr className={styles.total}>
              <td>Cleaning Total</td>
              <td>${(calculateCleaning()-cleaningDiscount).toFixed(2)}</td>
            </tr>)}
            {(formData.window && formData.windowInterior && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Window (Interior)</td>
              <td>${calculateWindowInterior().toFixed(2)}</td>
            </tr>)}
            {(formData.window && formData.windowExterior && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Window (Exterior)</td>
              <td>${calculateWindowExterior().toFixed(2)}</td>
            </tr>)}
            {(windowDiscount && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Window Frequency Discount</td>
              <td>-${windowDiscount}.00</td>
            </tr>)}
            {(formData.window && <tr className={styles.total}>
              <td>Window Total</td>
              <td>${(calculateWindowInterior() + calculateWindowExterior() - windowDiscount).toFixed(2)}</td>
            </tr>)}
            {(formData.pest && <tr>
              <td>Pest</td>
              <td>${calculatePest().toFixed(2)}</td>
            </tr>)}
            {(discountMessage && <tr>
              <td colspan='2'>{discountMessage}</td>
            </tr>)}
            {(bundleDiscount && <tr>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;Bundle Discount</td>
              <td>-${bundleDiscount.toFixed(2)}</td>
            </tr>)}
            <tr className={styles.total}>
              <td>Total</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.submitButton}>
          <button onClick={handleSubmit}>Get Service</button>
        </div>
      </div>
    </div>
  );
};

export default GetService;