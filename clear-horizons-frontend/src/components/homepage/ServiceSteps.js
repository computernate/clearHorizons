import React from "react";
import { Link } from "react-router-dom";

const ServiceSteps = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Get Service as Easy as 1, 2, 3!</h1>

      <div style={styles.step}>
        <h2 style={styles.stepNumber}>Step 1:</h2>
        <p style={styles.stepText}>
          Reach out to us by <Link to="/contact" style={styles.link}>calling</Link> or <Link to="/contact" style={styles.link}>emailing</Link> us. Let us know what you need, or fill out our 
          <Link to="/schedule" style={styles.link}> application form</Link>.
        </p>
      </div>

      <div style={styles.step}>
        <h2 style={styles.stepNumber}>Step 2:</h2>
        <p style={styles.stepText}>
          We’ll find the best time to visit and schedule your service.
        </p>
      </div>

      <div style={styles.step}>
        <h2 style={styles.stepNumber}>Step 3:</h2>
        <p style={styles.stepText}>
          On the day of service, just sit back, relax, and enjoy your sparkling clean home!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  step: {
    marginBottom: "2rem",
  },
  stepNumber: {
    fontSize: "1.8rem",
    color: "var(--nav-background)",
  },
  stepText: {
    fontSize: "1.2rem",
    color: "#555",
  },
  link: {
    color: "var(--nav-background)",
    textDecoration: "none",
  },
};

export default ServiceSteps;