import React, {useState} from 'react';
import styles from 'css/ServiceQuote/ServiceQuote.module.css'
import SelectServices from './SelectServices';
import ChooseAddress from './ChooseAddress';
import GenericService from './GenericService'
import Discounts from './Discounts';
import SubmitForm from './SubmitForm'
import Thanks from './Thanks';

import squeegee from 'assets/serviceQuote/squeegee.png'
import pin from 'assets/serviceQuote/pin.png'
import discount from 'assets/serviceQuote/discount.png'
import arrow from 'assets/serviceQuote/arrow.png'
import check from 'assets/serviceQuote/check.png'

const ServiceQuoteManager = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [data, setData] = useState([])

  const handleServiceSelection = (serviceData) => {
    setSelectedServices(serviceData);
    nextStep()
  };

  const addDataAndNext = (newData) =>{
    setData(prev => {return [...prev, newData]})
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    console.log(newData)
  }

  const steps = [
    { id: 'select', icon: squeegee, label: 'Select Services' },
    { id: 'address', icon: pin, label: 'Address' },
    ...selectedServices.map((service, index) => ({
      id: `service-${index}`,
      icon: service.logo || 'defaultServiceIcon.png',
      label: service.name,
    })),
    { id: 'discount', icon: discount, label: 'Discount' },
    { id: 'submit', icon: arrow, label: 'Submit' },
    { id: 'thanks', icon: check, label: 'Thanks' },
  ];

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };


  const renderIndicator = () => {
    return steps.map((step, idx) => (
      <div 
        key={step.id} 
        className={`circleButton ${idx > currentStep ? styles.deactivated : ''}`}
      >
        <img src={step.icon} alt={step.label} />
      </div>
    ));
  };

  let content;
  if (currentStep === 0) {
    content = (
      <SelectServices 
        setData={handleServiceSelection} 
        className={styles.contentWrapper} 
      />
    );
  } else if (currentStep === 1) {
    content = (
      <ChooseAddress 
        onNext={addDataAndNext}
        className={styles.contentWrapper} 
      />
    );
  } else if (currentStep > 1 && currentStep <= selectedServices.length + 1) {
    const serviceIndex = currentStep - 2;
    content = (
      <GenericService 
        serviceData={selectedServices[serviceIndex]} 
        onNext={addDataAndNext}
        className={styles.contentWrapper} 
      />
    );
  } else if (currentStep === selectedServices.length + 2) {
    content = (
      <Discounts 
        data={data.filter(item => 
          item.identifier && item.type && typeof item.total === 'number'
        )}
        onNext={addDataAndNext}
        className={styles.contentWrapper}
      />
    );
  } else if (currentStep === selectedServices.length + 3) {
    content = (
      <SubmitForm 
        data={data}
        className={styles.contentWrapper}
        nextStep={nextStep}
      />
    );
  }else if (currentStep === selectedServices.length + 4) {
    content = (
      <Thanks />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.buttonsWrapper}>
          {renderIndicator()}
        </div>
        {content}
      </div>
    </div>
  );
};

export default ServiceQuoteManager;