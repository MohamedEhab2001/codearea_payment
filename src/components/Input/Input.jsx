import React from "react";
import "./Input.scss";

const Input = ({
  type,
  label,
  icon,
  radios,
  value,
  id,
  validations = {},
  onChange = () => {},
  disabled,
}) => {
  if (type === "radio") {
    return (
      <div className="radio-group">
        {React.Children.toArray(
          radios?.map((radio) => {
            return (
              <div className="radio-container d-flex j-around  a-center">
                <div>
                  <input
                    type="radio"
                    name={label}
                    value={radio}
                    id={"st_gender"}
                  />
                  <label htmlFor={radio}>{radio}</label>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  return (
    <div className="input">
      <div className="input-field">
        <input
          type={type}
          value={value}
          id={id}
          {...validations}
          className="input_field"
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className="icon d-flex j-end a-center">
        <div className="icon-inner d-flex j-center a-center">{icon}</div>
      </div>
      <div className="label">
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Input;
