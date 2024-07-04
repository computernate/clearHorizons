import React from 'react';

import TitleImage from '../general/TitleImage'
import ServicesSummary from './ServicesSummary';
import DifferentSummary from './DifferentSummary';
import ProductsSummary from './ProductsSummary';
import StaffSummary from './StaffSummary';

const Homepage = () => {
    //usePageTracking();
    return (
        <div>
            <TitleImage imageUrl = "/homepage/home_house.png" titleText = "Clear Horizons Home" subtitle="HOME-WINDOW-PEST" />
            <ServicesSummary />
            <DifferentSummary />
            <ProductsSummary />
            <StaffSummary />
        </div>
    )
}

export default Homepage;
