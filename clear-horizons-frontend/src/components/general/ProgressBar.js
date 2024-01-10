import React from 'react';
import styles from 'css/general/ProgressBar.module.css'; // Import your CSS file

const ProgressBar = ({ total, current }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className={styles.progressBar}>
      <div className={styles.completedProgress} style={{ height: `${progressPercentage}%` }} />
      <div className={styles.slider} />
      <div className={styles.uncompletedProgress} style={{ height: `${100 - progressPercentage}%` }} />
    </div>
  );
};

export default ProgressBar;