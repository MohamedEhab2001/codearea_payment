import React, { useState } from "react";
import "./App.scss";
import { Input, Payment } from "./components";
import { FcAbout } from "react-icons/fc";
import useGetDemo from "./Hooks/GetDemo";
const App = () => {
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { getInfo, app, setApp } = useGetDemo();

  const handleClick = async () => {
    setLoading(true);
    const data = await getInfo(num);
    setLoading(false);
    if (data) {
      setSuccess(true);
      setApp({ ...data.demo });
    }
  };

  return (
    <div>
      <form className="d-flex j-center a-center g-20">
        {success ? (
          <Payment demo={app}/>
        ) : (
          <div className="demo_app tx-center d-flex-column j-center a-center ">
            <h2>Put demo app number</h2>
            <Input
              icon={<FcAbout />}
              label="Demo number"
              type={"text"}
              value={num}
              id="demonum"
              onChange={(e) => setNum(e.target.value)}
            />
            <button type="button" onClick={() => handleClick()}>
              {loading ? "Loading . . ." : "Get info"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
