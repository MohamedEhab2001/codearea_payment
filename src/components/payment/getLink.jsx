import axios from "axios";
import { Base } from "../../Helpers/constants";
import { Courses } from "../../data";
import useGetDemo from "../../Hooks/GetDemo";
const usePayment = () => {
  const { notify } = useGetDemo();
  const getLink = async (form, price, product, quantity) => {
    try {
      const stepByStep = {
        customer_email: form.parent_email,
        form,
        line_items: [
          {
            quantity: quantity,
            price_data: {
              ...price,
              product_data: {
                name: Courses[form.course - 1].label + " " + product.name,
              },
            },
          },
        ],
      };
      const Conf = {
        customer_email: form.parent_email,
        form,
        line_items: [
          {
            quantity: quantity,
            price_data: {
              ...price, 
              product_data: {
                name: Courses[form.course - 1].label + " " + product.name,
              },
            },
          },
        ],
      };
      const Custom = {
        customer_email: form.parent_email,
        form,
        line_items: [
          {
            quantity: quantity,
            price_data: {
              ...price,
              product_data: {
                name: Courses[form.course - 1].label + " " + product.name,
              },
            },
          },
        ],
      };
      let plan = {};
      if (form.plan == 1) {
        plan = { ...stepByStep };
      } else if (form.plan == 2) {
        plan = { ...Conf };
      } else {
        plan = { ...Custom };
      }
      if (form.payedChapters.length == 0) {
        notify({
          title: "No chapters",
          msg: "Please select chapters",
          type: "danger",
        });
      } else {
        const res = await axios.post(`${Base}pay`, plan);
        return res.data.url;
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return getLink;
};

export default usePayment;
