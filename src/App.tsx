import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ShopPage } from "./Pages/ShopPage";
import { AboutPage } from "./Pages/AboutPage";
import { ContactPage } from "./Pages/ContactPage";
import { Navigation } from "./component/Navigation";
import { ItemPage } from "./Pages/ItemPage";
import { FooterSection } from "./Pages/FooterSection";
import { CartPage } from "./Pages/CartPage";
import { Checkout } from "./Pages/Checkout";
import { Compare } from "./Pages/Compare";
import { UserProfile } from "./Pages/UserProfile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiningPage } from "./Pages/DiningPage";
import { LivingPage } from "./Pages/LivingPage";
import { BedroomPage } from "./Pages/BedroomPage";

export const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/furniture/:productId" element={<ItemPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/living" element={<LivingPage />} />
        <Route path="/bedroom" element={<BedroomPage />} />
      </Routes>
      <FooterSection />
    </>
  );
};
