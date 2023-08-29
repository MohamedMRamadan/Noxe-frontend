import { useNavigate } from "react-router-dom";
const ProtectdRouters = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("tk") === null) {
    return navigate("/auth");
  } else {
    return null;
  }
};
export default ProtectdRouters;
