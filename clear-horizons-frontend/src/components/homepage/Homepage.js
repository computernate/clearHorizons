import React from 'react';

import TitleImage from '../general/TitleImage'
import ServiceEstimateForm from './ServiceEstimateForm';
import ServiceSteps from './ServiceSteps';
import ServicesSummary from './ServicesSummary';
import DifferentSummary from './DifferentSummary';
import ProductsSummary from './ProductsSummary';
import StaffSummary from './StaffSummary';
import ScheduleHover from 'components/general/ScheduleHover';
// import ScheduleHover from 'components/general/ScheduleHover';
import Footer from 'components/general/Footer';

const Homepage = () => {
    //usePageTracking();
    return (
        <div>
            <ScheduleHover />
            <TitleImage imageUrl = "/homepage/home_house.png" titleText = "Clear Horizon Home" subtitle="HOME-WINDOW-PEST" />
            <ServiceEstimateForm />
            <ServicesSummary />
            <ServiceSteps />
            <StaffSummary />
            <Footer />
        </div>
    )
}

export default Homepage;
