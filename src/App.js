import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Component/Auth/Register";
import OTPVerification from "./Component/Auth/Otpverify";
import Product from "./Component/Product/Product";
import DetailsProduct from "./Component/Product/DetailsProduct";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetails" element={<DetailsProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
