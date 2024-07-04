import React from 'react';
import styles from 'css/homepage/DifferentSummary.module.css'

const DifferentSummary = () => {
    //usePageTracking();
    return (
        <div className={styles.wrapper}>
            <h2>What makes us <span className="gradientText">Different?</span></h2>
            <table className={styles.container}>
                <tr>
                    <td className="gradientText">A</td>
                    <td >in&nbsp;house.</td>
                    <td >All of our service are done by in-house staff who are trained and insured</td>
                </tr>
                <tr>
                    <td className="gradientText">L</td>
                    <td >local.</td>
                    <td >We source our equipment from local suppliers</td>
                </tr>
                <tr>
                    <td className="gradientText">L</td>
                    <td >in one.</td>
                    <td >Pay one bill for al of your homes services to be done by a company you trust</td>
                </tr>
            </table>
        </div>
    )
}

export default DifferentSummary;
