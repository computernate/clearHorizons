import React, {useState} from 'react';
import NumericSelector from "components/general/NumericSelector";
import styles from 'css/orders/DeepClean.module.css'; // Assuming you have styles for the icon

const DeepClean = ({updateForm}) => {
    let [standard, setStandard] = useState(0)
    let [french, setFrench] = useState(0)

    const updateDeepStandard = (newData) => {
        setStandard(newData)
        updateForm({deepStandard: newData})
    }
    const updateDeepFrench = (newData) => {
        setFrench(newData)
        updateForm({deepFrench: newData})
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContent}>
                <div className={styles.firstStory}>
                    <div className={styles.genericStandard}>
                        <div className={styles.imgAndSelector}>
                            <h3 className={styles.head}>Standard Windows</h3>
                            <img src="/housesetup/standard-pane.png" className={styles.houseImg} />
                            <NumericSelector value={standard} setValue={updateDeepStandard} />
                        </div>
                    </div>
                </div>

                <div className={styles.upperStory}>
                    <div className={styles.genericFrench}>
                        <div className={styles.imgAndSelector}>
                            <h3 className={styles.head}>French Windows</h3>
                            <img src="/housesetup/french-pane.png" className={styles.houseImg} />
                            <NumericSelector value={french} setValue={updateDeepFrench} />
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.note}>Only add panes that have tough stains and require a deeper clean. Common types of stains that require
        more attention are concrete, paint, tree sap or <span style={{textDecoration:"underline"}}>hard water</span>.
        Panes with tough stains that aren’t added here will not receive our deeper clean service.</p>
        </div>
    );
};

export default DeepClean;
