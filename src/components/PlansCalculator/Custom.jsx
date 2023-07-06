import React, { useEffect, useContext, useState } from "react";
import { ChaptersNet, ChaptersGross } from "../../data";
import { paymentContext } from "../payment/Payment";
const Custom = () => {
  const { price, setPrice, setProduct, chapters, setChapters, modifyState } =
    useContext(paymentContext);
  useEffect(() => {
    setPrice({
      ...price,
      unit_amount: parseInt(
        (ChaptersGross(chapters).toFixed(2) / chapters) * 100
      ),
    });
    setProduct({ name: " 1 chapter" });
    modifyState("type", "cash");
  }, [chapters]);
  return (
    <>
      <div className="d-flex-cloumn w-100 j-center a-center">
        <div className="d-flex a-center j-start w-100 g-10">
          <p>No. Chapters : </p>
          <input
            type="number"
            min={3}
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
          />
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Net Price : </p>
          <legend>{ChaptersNet(chapters).toFixed(2)} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Gross Price : </p>
          <legend>{ChaptersGross(chapters).toFixed(2)} GBP</legend>
        </div>
        <div className="d-flex a-center j-start w-100 g-10">
          <p>Class Price : </p>
          <legend>{(ChaptersGross(1) / 24).toFixed(2)} GBP</legend>
        </div>
      </div>
    </>
  );
};

export default Custom;
