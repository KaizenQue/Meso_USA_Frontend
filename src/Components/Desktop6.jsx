import React from 'react';

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#faf3ec",
    minHeight: "960px",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "80px",
    fontFamily: "Roboto",
    color: "#fff",
  },
  header: {
    maxWidth: "685px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  headerTitle: {
    fontSize: "55px",
    color: "#1c2228",
    fontFamily: "'Segoe UI'",
    letterSpacing: "-2.03px",
    lineHeight: "60px",
    textTransform: "capitalize",
  },
  headerSubtitle: {
    fontSize: "18px",
    letterSpacing: "-0.02em",
    color: "#1e1e1e",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-between",
    gap: "50px",
  },
  categoriesSection: {
    flex: 1,
    maxWidth: "940px",
  },
  categoriesContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
  },
  categoryBox: {
    flex: 1,
    maxWidth: "300px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  categoryIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
  },
  categoryContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  categoryTitle: {
    fontSize: "20px",
    color: "#1c2228",
    fontFamily: "'Segoe UI'",
    fontWeight: "600",
  },
  categoryDescription: {
    fontSize: "16px",
    color: "#1c2228",
  },
  formSection: {
    width: "398px",
  },
  formBox: {
    backgroundColor: "#4b2c5e",
    borderRadius: "20px",
    padding: "30px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formTitle: {
    fontSize: "35px",
    fontFamily: "SeoulNamsan",
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formFieldLabel: {
    color: "#fff",
  },
  formFieldLine: {
    borderTop: "1px solid rgba(255, 255, 255, 0.44)",
    width: "100%",
  },
  submitButton: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    padding: "12px 16px",
    color: "#000",
    fontFamily: "Lato",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
  },
  phoneButton: {
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  phoneButtonInner: {
    backgroundColor: "#4b2c5e",
    borderRadius: "43px",
    padding: "19px 62px",
    color: "#fff",
    fontWeight: "500",
  },
};

const FormField = ({ label }) => (
  <div style={styles.formField}>
    <div style={styles.formFieldLabel}>{label}</div>
    <div style={styles.formFieldLine} />
  </div>
);

const Category = ({ title, description, icon }) => (
  <div style={styles.categoryBox}>
    <img style={styles.categoryIcon} alt="" src={icon} />
    <div style={styles.categoryContent}>
      <div style={styles.categoryTitle}>{title}</div>
      <div style={styles.categoryDescription}>
        {Array.isArray(description) ? description.join(", ") : description}
      </div>
    </div>
  </div>
);

const Desktop6 = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <span>Diagnosed with </span>
          <span style={{ color: "#4b2c5e" }}>Mesothelioma </span>
          <span>on the Job? </span>
        </div>
        <div style={styles.headerSubtitle}>
          <p style={{ margin: "0" }}>You May Be Entitled to Compensation for Mesothelioma Caused</p>
          <p style={{ margin: "0" }}>by Military-Related Asbestos Exposure.</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Categories Section */}
        <div style={styles.categoriesSection}>
          <div style={styles.categoriesContainer}>
            <Category
              title="Auto Repair & Maintenance"
              description={["Brake Specialists, Mechanics, Clutch", "Repair Technicians"]}
              icon="Icon.svg"
            />
            <Category
              title="Manufacturing & Assembly"
              description={["Automotive Assembly Line Workers, Parts", "Fabricators, Industrial Machine Operators"]}
              icon="Icon.png"
            />
            <Category
              title="Specialized Automotive Services"
              description="Auto Body Technicians, Paint Shop Workers, Heavy Equipment Technicians"
              icon="Icon.svg"
            />
          </div>
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          <div style={styles.formBox}>
            <div style={styles.formTitle}>Claim Form</div>
            <div style={styles.formFields}>
              <FormField label="First Name *" />
              <FormField label="Last Name *" />
              <FormField label="Phone Number *" />
              <FormField label="Email ID *" />
              <FormField label="Date of birth *" />
              <FormField label="Type of Diagnosis *" />
              <FormField label="Tell us your story (optional)" />
              <FormField label="Job Title" />
            </div>
            <button style={styles.submitButton}>Submit</button>
          </div>
        </div>
      </div>

      {/* Phone Button */}
      <div style={styles.phoneButton}>
        <div style={styles.phoneButtonInner}>
          (888) 212-8149
        </div>
      </div>
    </div>
  );
};

export default Desktop6;
