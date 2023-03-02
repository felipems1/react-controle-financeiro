import RoutesMain from "./routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <RoutesMain />
    </>
  );
};

export default App;
