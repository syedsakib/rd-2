import React from "react";

const CheckBox = ({ onChange, isChecked }) => {
  return (
    <label className="check-container header-check-container">
      <input type="checkbox" onChange={onChange} checked={isChecked} />
      <span className="checkmark" />
    </label>
  );
};

export default CheckBox;
