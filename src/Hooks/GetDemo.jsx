import axios from "axios";
import { Base } from "../Helpers/constants";
import { Store } from "react-notifications-component";
import { useState } from "react";
const useGetDemo = () => {
  const notify = (message, duration = 2000) => {
    Store.addNotification({
      title: message.title,
      message: message.msg,
      type: message.type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: duration,
        onScreen: true,
      },
    });
  };
  const getInfo = async (num) => {
    if (num === "") {
      notify({
        title: "Cannot be empty",
        msg: "Please enter valid demp number",
        type: "danger",
      });
      return;
    } else if (num.length < 15 || num.length > 15) {
      notify({
        title: "Invalid length",
        msg: "wrong format and length",
        type: "danger",
      });
      return;
    }
    try {
      const res = await axios(`${Base}demo/${num}`);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        notify(
          {
            title: error.response.data.msg,
            msg: error.response.data.fixIt,
            type: "danger",
          },
          4000
        );
      }
    }
  };

  const [app, setApp] = useState({});

  return { getInfo, app, setApp, notify };
};

export default useGetDemo;
