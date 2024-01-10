import React, {useState} from 'react';
import NumericSelector from "components/general/NumericSelector";
import styles from 'css/housesetup/SelectWindows.module.css'; // Assuming you have styles for the icon

const SelectWindows = ({updateForm}) => {
    let [standardPanes, setStandardPanes] = useState(1)
    let [frenchPanes, setFrenchPanes] = useState(1)
    let [highPanes, setHighPanes] = useState(1)
    let [highFrenchPanes, setHighFrenchPanes] = useState(1)
    let [wellPanes, setWellPanes] = useState(1)
    let [screens, setScreens] = useState(1)

    const updateStandardPanes = (newData) => {
        setStandardPanes(newData)
        updateForm({standardPanes: newData})
    }
    const updateFrenchPanes = (newData) => {
        setFrenchPanes(newData)
        updateForm({frenchPanes: newData})
    }
    const updateHighPanes = (newData) => {
        setHighPanes(newData)
        updateForm({highPanes: newData})
    }
    const updateHighFrenchPanes = (newData) => {
        setHighFrenchPanes(newData)
        updateForm({highFrenchPanes: newData})
    }

    return (
        <div className={styles.mainContent}>

            <div className={styles.firstStory}>
                <h4 className={styles.head}>1st Story Window Panes</h4>
                <div className={styles.genericPanes}>
                    <div className={styles.imageWrapper}><img src="/housesetup/first-story-panes.png" className={styles.houseImg} /></div>
                    <div className={styles.optionSectional}>
                        <div className={styles.imgAndSelector}>
                            <h4>Standard Pane</h4>
                            <img src="/housesetup/standard-pane.png" className={styles.houseImg} />
                            <NumericSelector value={standardPanes} setValue={updateStandardPanes} />
                        </div>
                        <div className={styles.imgAndSelector}>
                            <h4>French Pane</h4>
                            <img src="/housesetup/french-pane.png" />
                            <NumericSelector value={frenchPanes} setValue={updateFrenchPanes} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.upperStory}>
                <h4 className={styles.head}>Upper Story Window Panes</h4>
                <div className={styles.genericPanes}>
                    <div className={styles.imageWrapper}><img src="/housesetup/high-story-panes.png" className={styles.houseImg} /></div>
                    <div className={styles.optionSectional}>
                        <div className={styles.imgAndSelector}>
                            <h4>Standard Pane</h4>
                            <img src="/housesetup/standard-pane.png" />
                            <NumericSelector value={highPanes} setValue={updateHighPanes} />
                        </div>
                        <div className={styles.imgAndSelector}>
                            <h4>French Pane</h4>
                            <img src="/housesetup/french-pane.png" />
                            <NumericSelector value={highFrenchPanes} setValue={updateHighFrenchPanes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectWindows;
