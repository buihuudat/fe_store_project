import { toast } from "react-toastify";

const Noti = (type, msg) => {
  toast(msg, {
    type,
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default Noti;
