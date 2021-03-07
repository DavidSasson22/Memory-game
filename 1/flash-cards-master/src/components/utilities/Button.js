import React from "react";

const Button = ({ type, value, content, onClick = () => {} }) => {
  const handleClick = (e) => {
    onClick(e.target.value);
  };
  return (
    <button type={type} value={value} onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
