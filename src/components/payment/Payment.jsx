import React, { useState, createContext } from "react";
import Input from "../Input/Input";
import InvoiceSelect from "./InvoiceSelect";
import { BiMailSend, BiMobile, BiFlag, BiUser, BiUserPin, BiUserPlus } from "react-icons/bi";
import { Plans, Courses } from "../../data";
import Step from "../PlansCalculator/Step";
import Confidinet from "../PlansCalculator/Confidinet";
import Custom from "../PlansCalculator/Custom";
import usePayment from "./getLink";
import Chapters from "../Chapters/Chapters";
export const paymentContext = createContext();
const Payment = ({ demo }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState(3);
  const [price, setPrice] = useState({
    currency: "gbp",
    unit_amount: 0,
  });
  const [product, setProduct] = useState({
    name: "",
  });
  const [form, setForm] = useState({ ...demo });
  const modifyState = (key, val) => {
    setForm({ ...form, [key]: val });
  };
  const getLink = usePayment();
  const handleSubmit = async () => {
    setLoading(true);
    const linkToPay = await getLink(form, price, product, chapters);
    setLink(linkToPay);
    setLoading(false);
  };
  return (
    <paymentContext.Provider
      value={{
        form,
        price,
        setPrice,
        product,
        setProduct,
        chapters,
        setChapters,
        modifyState,
      }}
    >
      <div className="demo_app tx-center d-flex-column j-center a-center ">
        <h2>Demo information</h2>
        <div className="row w-100">
          <Input
            icon={<BiFlag />}
            label="Country"
            type={"text"}
            disabled
            value={form.country}
            id="country"
          />
        </div>
        <div className="row d-flex g-15 a-center w-100">
          <Input
            icon={<BiMailSend />}
            label="Parent email"
            type={"email"}
            disabled
            value={form.parent_email}
            id="parent_email"
          />
          <Input
            icon={<BiMobile />}
            label="Parent phone"
            type={"tel"}
            disabled
            value={form.parent_phone}
            id="parent_phone"
          />
        </div>
        <div className="row d-flex g-15 a-center w-100">
          <Input
            icon={<BiUser />}
            label="Parent name"
            type={"text"}
            disabled
            value={form.parent_name}
            id="parent_name"
          />
          <Input
            icon={<BiUser />}
            label="Student name"
            type={"text"}
            disabled
            value={form.st_name}
            id="st_name"
          />
        </div>
        <div className="row d-flex g-15 a-center w-100">
          <Input
            icon={<BiUserPin />}
            label="Student gender"
            type={"text"}
            disabled
            value={form.st_gender}
            id="st_gender"
          />
          <Input
            icon={<BiUserPlus />}
            label="Student age"
            type={"number"}
            disabled
            value={form.st_age}
            id="st_age"
          />
        </div>
      </div>
      <div className="demo_app tx-center d-flex-column j-center a-center ">
        <h2>Invoice details</h2>
        <InvoiceSelect
          change={modifyState}
          elements={Plans}
          id="plan"
          label={"plan"}
        />
        {form.plan ? (
          <InvoiceSelect
            change={modifyState}
            id="course"
            elements={Courses}
            label={"course"}
          />
        ) : (
          ""
        )}
        {form.plan && form.course ? <Chapters /> : ""}
        {form.plan == 1 && form.course ? <Step /> : ""}
        {form.plan == 2 && form.course ? <Confidinet /> : ""}
        {form.plan == 3 && form.course ? <Custom /> : ""}
        <button type="button" onClick={() => handleSubmit()}>
          {loading ? "Loading . . ." : "Generate"}
        </button>
        {link ? (
          <textarea
            value={link}
            style={{ height: "150px", width: "730px" }}
          ></textarea>
        ) : (
          ""
        )}
      </div>
    </paymentContext.Provider>
  );
};

export default Payment;
