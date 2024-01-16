import React, {useState} from 'react';
import { fetchData } from 'fetchUtil';
import Button from 'components/general/Button'
import styles from 'css/housesetup/Results.module.css'
import {NavLink} from 'react-router-dom'

const Results = ({data}) => {
    const [result, setResult] = useState(null);

    const postData = async () => {
      try {
        const response = await fetchData('/building_estimate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        setResult(response);
      } catch (error) {
        console.error('Error posting data:', error);
        setResult("ERROR")
      }
    };

    function formatCurrency(value, locale = 'en-US', currency = 'USD') {
      return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
      }).format(value);
    }
    
    // Call postData when the component mounts or data changes
    React.useEffect(() => {
      postData();
    }, [data]);
  
    return (
      <div>
        {result ? (
          <div className={styles.wrapper}>
            <h2>Your quote is <span className={styles.moneyText}>{formatCurrency(result.wash_quote)}</span></h2>
            <h3>See how you could pay just <span className={styles.moneyText}>{formatCurrency(result.save_info)}</span>
            , pay online, and manage your future washes easily
            by signing up for an account!</h3>
            <NavLink><Button>Sign up with Jobber</Button></NavLink>
            <p>or...</p>
            <h4><NavLink to={'/contact'}><Button>Contact us</Button></NavLink> to get your work done without an account</h4>
          </div>
          ) : <p>Loading...</p>}
      </div>
    );
}

export default Results;