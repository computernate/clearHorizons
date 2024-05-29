import React from 'react';

import Greetings from './Greetings'
import Whyus from './Whyus'
import Aboutus from './Aboutus'
import OurServices from './OurServices'
import Faq from './Faq'
import SavingsProgram from './SavingsProgram'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import ReactGA from 'react-ga4';


function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
}

const Homepage = () => {
    usePageTracking();
    return (
        <div>
            <Greetings />
            <Whyus />
            <Aboutus />
            <OurServices />
            <Faq />
            <SavingsProgram />
        </div>
    )
}

export default Homepage;
