import React from 'react';
import styles from 'css/general/TitleImage.module.css'; // Import your CSS file for styling

const TitleImage = ({ imageUrl, titleText, subtitle }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})`,
  };

  return (
    <div className={styles.titleImage} style={divStyle}>
      <div className={styles.titleOverlay}>
        <h2>{titleText}</h2>
        {subtitle && <h5>{subtitle}</h5>}
      </div>
    </div>
  );
};

export default TitleImage;