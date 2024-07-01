import React from 'react';

import TitleImage from '../general/TitleImage'
import ServicesSummary from './ServicesSummary';

const Homepage = () => {
    usePageTracking();
    return (
        <div>
            <TitleImage imageUrl = "/homepage/home_house.png" titleText = "Clear Horizons Home" subtitle="HOME-WINDOW-PEST" />
            <ServicesSummary />
        </div>
    )
}

export default Homepage;
