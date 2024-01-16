import React, { useState } from 'react';
import styles from 'css/housesetup/HouseSetup.module.css'

import InitialSetup from 'components/housesetup/InitialSetup'
import Sidebar from 'components/housesetup/Sidebar'
import Results from 'components/housesetup/Results'

import SelectFloors from 'components/housesetup/windows/SelectFloors'
import SelectWindows from 'components/housesetup/windows/SelectWindows'
import SelectExtra from 'components/housesetup/windows/SelectExtra'

const HouseSetup = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [currentPage, setCurrentPage] = useState("initial")
    const [formData, setFormData] = useState({
        address:'',
        floors:1,
        standardPanes:0, 
        frenchPanes:0, 
        highPanes: 0, 
        highFrenchPanes: 0,
        wells:0,
        screens:0
    })

    const updateFormData = (data) =>{
        setFormData({ ...formData, ...data });
    }

    const cleaningSteps = {
        "initial":{
            id: 'initial',
            active: true,
            steps:[
                {
                    title: "Job Site and Services",
                    //updates: address
                    component: (<InitialSetup updateForm={updateFormData} />)
                },
            ],
        },
        "windows": {
            id: 'windows',
            active: true,
            steps: [
                {
                    title: "Floors in house",
                    //updates: floors
                    component: (<SelectFloors updateForm={updateFormData} />)
                },
                {
                    title: "Windows",
                    //updates: standardPanes, frenchPanes, highPanes, highFrenchPanes
                    component: (<SelectWindows updateForm={updateFormData} />)
                },
                {
                    title: "Extra",
                    //updates: wells, screens
                    component: (<SelectExtra updateForm={updateFormData} />)
                },
            ],
        },
        "results": {
            id: 'results',
            active: true,
            steps: [
                {
                    title: "Results",
                    component: (<Results  data={formData} />)
                },
            ],
        }
    }

    const goToNextStep = () => {
        const stepsInCurrentPage = cleaningSteps[currentPage].steps;
        const nextPage = getNextActivePage(cleaningSteps, currentPage);

        // Increment currentStep, or move to the next active page if at the end of the current page
        if (currentStep < stepsInCurrentPage.length - 1) {
            // Increment step within the same page
            setCurrentStep(currentStep + 1);
        } else if (nextPage) {
            // Move to the next active page
            setCurrentPage(nextPage);
            setCurrentStep(0);
        }
    };

    // Helper function to get the next active page
    const getNextActivePage = (stepsObject, currentPage) => {
        const pages = Object.keys(stepsObject);
        const currentIndex = pages.indexOf(currentPage);
        for (let i = currentIndex + 1; i < pages.length; i++) {
            if (stepsObject[pages[i]].active) {
                return pages[i];
            }
        }
        return null; // No next active page found
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{cleaningSteps[currentPage].steps[currentStep].title}</h2>
                {cleaningSteps[currentPage].steps[currentStep].component}
            </div>
            <Sidebar
                goToNextStep={goToNextStep}
                total={cleaningSteps[currentPage].steps.length}
                currentStep={currentStep}
                currentPage={currentPage}
                steps={cleaningSteps}
            />
        </div>
    )
}

export default HouseSetup;