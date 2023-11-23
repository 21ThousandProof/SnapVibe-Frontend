import React from "react";

const NameField = ({ value, onNameChanged }) => {
  const handleNameChange = (event) => {
    const newName = event.target.value;
    onNameChanged(newName);
  };

  const styles = {
    container: {
      margin: "10px",
    },
    input: {
      padding: "8px",
      fontSize: "16px",
      width: "200px",
    },
  };

  return (
    <div style={styles.container}>
      <label htmlFor="nameInput">Username:</label>
      <input
        type="text"
        id="nameInput"
        value={value}
        onChange={handleNameChange}
        style={styles.input}
      />
    </div>
  );
};

export default NameField;
