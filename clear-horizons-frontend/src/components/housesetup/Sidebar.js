import React from 'react';
import ProgressBar from 'components/general/ProgressBar'
import Button from 'components/general/Button'
import styles from 'css/housesetup/Sidebar.module.css'; // Import your CSS file

const Sidebar = ({goToNextStep, total, currentPage, currentStep, steps}) => {

    return (
        <div className={styles.sidebar}>
            <ProgressBar total={total} current={currentPage} />
            <Button callback={goToNextStep}>NEXT STEP</Button>
        </div>
    );
};

export default Sidebar;