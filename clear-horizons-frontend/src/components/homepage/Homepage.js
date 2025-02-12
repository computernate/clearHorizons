import React from 'react';

import TitleImage from '../general/TitleImage'
import ServiceEstimateForm from './ServiceEstimateForm';
import ServiceSteps from './ServiceSteps';
import OurServices from './OurServices';
import CustomerReviews from './CustomerReviews';
import WhyUs from './WhyUs';
import Care from './Care';
import ScheduleHover from 'components/general/ScheduleHover';
// import ScheduleHover from 'components/general/ScheduleHover';
import Footer from 'components/general/Footer';

const Homepage = () => {
    //usePageTracking();
    return (
        <div>
            <TitleImage imageUrl = "/homepage/home_head.jpg" titleText = "Clear Horizon Home" subtitle="Window and Home Cleaning" button="Get Free Quote" />
            <OurServices />
            <CustomerReviews />
            <ServiceEstimateForm />
            <WhyUs />
            <Care />
            <Footer />
        </div>
    )
}

export default Homepage;
