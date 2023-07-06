import React, { useState, useEffect, useContext } from "react";
import {
  mainPrice,
  StepByStepGross,
  StepByStepInstallmentPrice,
} from "../../data";
import { paymentContext } from "../payment/Payment";
const Step = () => {
  const [installment, setInstallment] = useState(false);
  const { price, setPrice, setProduct, setChapters, modifyState } =
    useContext(paymentContext);
  const handleChange = () => {
    setInstallment(!installment);
  };
  useEffect(() => {
    setPrice({ ...price, unit_amount: parseInt(StepByStepGross().toFixed(2) * 100 )});
    setProduct({ name: " 1 chapter" });
    setChapters(1);
    modifyState("type", "cash");
  }, []);
  useEffect(() => {
    if (installment) {
      setPrice({
        ...price,
        unit_amount: parseInt(
          (StepByStepInstallmentPrice(2).toFixed(2) / 2) * 100
        ),
      });
      modifyState("type", "installment");
    } else {
      setPrice({
        ...price,
        unit_amount: StepByStepGross(2).toFixed(2) * 100,
      });
      modifyState("type", "cash");
    }
  }, [installment]);
  return (
    <>
      <div className="d-flex-cloumn w-100 j-center a-center">
        <div className="d-flex a-center j-start w-100 g-10">
          <p>No. Chapters : </p>
          <legend>1</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Net Price : </p>
          <legend>{mainPrice} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Gross Price : </p>
          <legend>{StepByStepGross().toFixed(2)} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Class Price : </p>
          <legend>{StepByStepGross().toFixed(2) / 24} GBP</legend>
        </div>
        <div className="d-flex a-center j-start g-10">
          <input
            type={"checkbox"}
            id="installment"
            checked={installment}
            onChange={() => handleChange()}
          />
          <label htmlFor="installment">Installment</label>
        </div>
        {installment && (
          <div className="d-flex-column a-start j-center">
            <div className="d-flex j-start a-center g-10">
              <p>installment period : </p>
              <p>2 months</p>
            </div>
            <div className="d-flex j-start a-center g-10">
              <p>installment price : </p>
              <p>{StepByStepInstallmentPrice(2).toFixed(2)} GBP </p>
            </div>
            <div className="d-flex j-start a-center g-10">
              <p>Every month : </p>
              <p>{StepByStepInstallmentPrice(2).toFixed(2) / 2} GBP </p>
            </div>
            <div className="d-flex j-start a-center g-10">
              <p>Class price : </p>
              <p>{(StepByStepInstallmentPrice(2) / 24).toFixed(2)} GBP </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Step;
