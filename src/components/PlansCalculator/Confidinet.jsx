import React, { useEffect, useContext } from "react";
import { ChaptersNet, ChaptersGross } from "../../data";
import { paymentContext } from "../payment/Payment";
const Confidinet = () => {
  const { price, setPrice, setProduct, setChapters,modifyState } =
    useContext(paymentContext);
  useEffect(() => {
    setPrice({
      ...price,
      unit_amount: (ChaptersGross(2).toFixed(2) / 2) * 100,
    });
    setProduct({ name: " 1 chapter" });
    setChapters(2);
    modifyState("type" , "cash")
  }, []);
  return (
    <>
      <div className="d-flex-cloumn w-100 j-center a-center">
        <div className="d-flex a-center j-start w-100 g-10">
          <p>No. Chapters : </p>
          <legend>2</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Net Price : </p>
          <legend>{ChaptersNet(2).toFixed(2)} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Gross Price : </p>
          <legend>{ChaptersGross(2).toFixed(2)} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Class Price : </p>
          <legend>{(ChaptersGross(1) / 24).toFixed(2)} GBP</legend>
        </div>
      </div>
    </>
  );
};

export default Confidinet;
