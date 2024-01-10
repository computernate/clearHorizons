import React, {useState} from 'react';
import GoogleMapAutocomplete from "components/general/GoogleMapAutocomplete";
import styles from 'css/housesetup/InitialSetup.module.css'

const InitialSetup = ({updateForm}) => {
    const [address, setAddress] = useState('Select an address')

    const updateData = (data)=>{
        setAddress(data)
        updateForm({address:data})
    }

    return (
        <div className={styles.container}>
            <GoogleMapAutocomplete className={styles.map} setAddress={updateData} />
            <div className={styles.services}>
                <h3>Services</h3>
                <div className={styles.checkbox}>
                    <label htmlFor={"windows"} >Window Cleaning</label>
                    <input type={"checkbox"} name={"windows"} defaultChecked />
                </div>
            </div>
        </div>
    )
}

export default InitialSetup;