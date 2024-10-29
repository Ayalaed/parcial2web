import React from "react";

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default Input;