import React, { useState, useEffect } from 'react';
import styles from 'css/ServiceQuote/SelectServices.module.css'
import GoogleMapAutocomplete from 'components/general/GoogleMapAutocomplete';

const ChooseAddress = ({onNext}) => {
  const [address, setAddress] = useState('TEST ADDRESS')

  const handleSubmit = () => {
    if(address!="")
      onNext({address:address})
  }

  return (
    <div className={styles.wrapper}>
        <h2>Choose Address</h2>
        <GoogleMapAutocomplete setAddress={setAddress} />
        <button onClick={handleSubmit}>NEXT</button>
    </div>
  );
};

export default ChooseAddress;