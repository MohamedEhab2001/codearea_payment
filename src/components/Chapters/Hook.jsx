import axios from "axios";
import { Base } from "../../Helpers/constants";
import useGetDemo from "../../Hooks/GetDemo";
const useChapters = () => {
  const { notify } = useGetDemo();
  const getChapters = async (courseId) => {
    try {
      const response = await axios.get(`${Base}curriculum/${courseId}`);
      return response.data;
    } catch (error) {
      notify({
        title: "Error getting chapters",
        msg: "Cannot get chapters",
        type: "danger",
      });
    }
  };
  return getChapters;
};

export default useChapters;
