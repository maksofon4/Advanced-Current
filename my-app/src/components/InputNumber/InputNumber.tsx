import React, { useState, useEffect } from "react";
import "./InputNumber.css";

interface InputNumberProps {
  inputName: string;
  value: number;
  onChange: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  inputName,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const regex = /^-?\d*\.?\d*$/;
    if (val === "") {
      setInputValue("0");
      onChange(0);
    }

    if (regex.test(val)) {
      setInputValue(val);
      const numericValue = parseFloat(val);
      if (!isNaN(numericValue)) onChange(numericValue);
    }
  };

  return (
    <div className="input_container">
      <p className="input_name">{inputName}</p>
      <input
        type="tel"
        value={inputValue}
        onChange={handleChange}
        className="input_field"
      />
    </div>
  );
};

export default InputNumber;
