import React, {useState} from 'react';
import NumericSelector from "components/general/NumericSelector";
import styles from 'css/housesetup/SelectWindows.module.css'; // Assuming you have styles for the icon

const SelectExtras = ({updateForm}) => {
    let [wellPanes, setWells] = useState(1)
    let [screens, setScreens] = useState(1)

    const updateWells = (newData) => {
        setWells(newData)
        updateForm({wells: newData})
    }
    const updateScreens = (newData) => {
        setScreens(newData)
        updateForm({screens: newData})
    }

    return (
        <div className={styles.mainContent}>

            <div className={styles.firstStory}>
                <div className={styles.genericWell}>
                    <div className={styles.imgAndSelector}>
                        <h3>Window Wells</h3>
                        <img src="/housesetup/window-well-pane.png" className={styles.houseImg} />
                        <NumericSelector value={wellPanes} setValue={updateWells} />
                    </div>
                </div>
            </div>

            <div className={styles.upperStory}>
                <div className={styles.genericScreen}>
                    <div className={styles.imgAndSelector}>
                        <h3>Screens</h3>
                        <img src="/housesetup/screen.png" className={styles.houseImg} />
                        <NumericSelector value={screens} setValue={updateScreens} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectExtras;
