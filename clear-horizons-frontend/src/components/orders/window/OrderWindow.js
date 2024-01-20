import React, {useState} from 'react';
import DeepClean from "./DeepClean";
import Sidebar from "../../housesetup/Sidebar";
import styles from 'css/orders/OrderWindow.module.css'


const OrderWindow = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const [currentPage, setCurrentPage] = useState("Windows")
    const [formData, setFormData] = useState({
        deepStandard:0,
        deepFrench:0
    })

    const updateFormData = (data) =>{
        setFormData({ ...formData, ...data });
    }

    const cleaningSteps = {
        "Windows":{
            id: 'Windows',
            active: true,
            steps:[
                {
                    title: "Do any of your windows need a deeper clean?",
                    component: (<DeepClean updateForm={updateFormData} />)
                },
            ],
        },
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

export default OrderWindow;