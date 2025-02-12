import React, { useState } from 'react';
import styles from "css/pages/Contact.module.css";
import Footer from 'components/general/Footer';
// import ScheduleHover from 'components/general/ScheduleHover';

const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form refresh
  
      try {
        const response = await fetch("/ch_base/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Message sent successfully!");
          setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Reset form
        } else {
          alert("Error sending message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    };
  return (
    <div className={styles.wrapper}>
    <div className={styles.contactContainer}>
      <div className={styles.contactForm}>
        <h1>Contact Us</h1>
        <p>
          If you've got a specific question, are inquiring for a business, or
          interested in collaborating, please provide your information, and we
          will contact you soon. We look forward to connecting with you.
        </p>
        <a href="mailto:clearhorizons.utah@gmail.com" className={styles.contactEmail}>
          clearhorizons.utah@gmail.com
        </a>
        <p className={styles.contactPhone}>(801)553-2261</p>

        <form>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputField}>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button onClick={handleSubmit} className={styles.sendButton}>SEND</button>
        </form>
      </div>

      <div className={styles.contactImage}>
      </div>
    </div>
    
    <Footer />
    </div>
  );
};

export default Contact;