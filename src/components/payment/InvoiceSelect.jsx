import React from "react";

const InvoiceSelect = ({ change, id, elements, label }) => {
  return (
    <>
      <select
        name=""
        className="pad-20 input"
        id={id}
        onChange={(e) => change(e.target.id, e.target.value)}
      >
        <option value={""}>Choose {label}</option>
        {React.Children.toArray(
          elements.map((element) => {
            return (
              <option value={element.id}>{element.label}</option>
            );
          })
        )}
      </select>
    </>
  );
};

export default InvoiceSelect;
