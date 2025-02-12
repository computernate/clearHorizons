import React from 'react';
import styles from 'css/general/TitleImage.module.css'; // Import your CSS file for styling
import {NavLink} from 'react-router-dom'

const TitleImage = ({ imageUrl, titleText, subtitle, button }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}${imageUrl})`,
    backgroundPositionY:'40%'
  };

  return (
    <div className={styles.titleImage} style={divStyle}>
      <div className={styles.titleOverlay}>
        <h2>{titleText}</h2>
        {subtitle && <h5>{subtitle}</h5>}
        {button && (
          <div className={styles.quoteButton}>
            <NavLink
                to={'/quote'}
                className="quotelink">
                {button}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleImage;