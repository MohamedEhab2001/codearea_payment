import React, { useEffect, useState, useContext, useRef } from "react";
import useChapters from "./Hook";
import { paymentContext } from "../payment/Payment";
const Chapters = () => {
  const [chapters, setChapter] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { form, modifyState, chapters: quantity } = useContext(paymentContext);
  const getChapters = useChapters();
  const ref = useRef([]);
  useEffect(() => {
    getChapters(form.course).then((pay) => {
      setChapter(pay.chapters);
      setLoading(false);
      modifyState("payedChapters", []);
    });
  }, [loading, form.course]);

  useEffect(() => {
    if (form?.payedChapters?.length >= quantity) {
      setDisabled(true);
    }
    if (form?.payedChapters?.length < quantity && disabled) {
      setDisabled(false);
    }
  }, [form?.payedChapters, quantity]);

  const Unchecked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      modifyState("payedChapters", [...form.payedChapters, e.target.id]);
    } else {
      const payedChapters = [...form.payedChapters];
      const index = payedChapters.indexOf(e.target.id);
      if (index >= 0) {
        payedChapters.splice(index, 1);
        modifyState("payedChapters", [...payedChapters]);
      }
    }
  };

  if (loading) {
    return <div>Getting chapters . . . </div>;
  }
  return (
    <div className="d-flex j-start pad-15 g-10">
      {chapters.map((chapter, i) => {
        return (
          <div key={chapter.id} className="d-flex j-start a-center g-15">
            <input
              type="checkbox"
              id={chapter.id}
              onChange={handleChange}
              disabled={disabled}
              ref={(element) => {
                ref.current[i] = element;
              }}
            />
            <label htmlFor={chapter.id}> {chapter.title}</label>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          modifyState("payedChapters", []);
          Unchecked();
        }}
      >
        clear
      </button>
    </div>
  );
};

export default Chapters;
