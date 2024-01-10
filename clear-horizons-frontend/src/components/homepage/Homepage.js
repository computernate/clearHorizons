import React from 'react';

import Greetings from './Greetings'
import Whyus from './Whyus'
import Aboutus from './Aboutus'
import OurServices from './OurServices'
import Faq from './Faq'
import SavingsProgram from './SavingsProgram'

const Homepage = () => {

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