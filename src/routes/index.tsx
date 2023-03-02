import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Finance from "../pages/Finance";

import Private from "./Private";

const RoutesMain = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/finance"
          element={
            <Private>
              <Finance />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesMain;
