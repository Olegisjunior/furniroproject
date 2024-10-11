import { Route, Routes } from "react-router-dom";
import { Navigation } from "./component/Navigation";
import { HomePage } from "./Pages/HomePage";
import { FooterSection } from "./Pages/FooterSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import { Oval } from "react-loader-spinner";

const ShopPage = React.lazy(() => import("./Pages/ShopPage"));
const AboutPage = React.lazy(() => import("./Pages/AboutPage"));
const ContactPage = React.lazy(() => import("./Pages/ContactPage"));
const ItemPage = React.lazy(() => import("./Pages/ItemPage"));
const CartPage = React.lazy(() => import("./Pages/CartPage"));
const Checkout = React.lazy(() => import("./Pages/Checkout"));
const Compare = React.lazy(() => import("./Pages/Compare"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
const DiningPage = React.lazy(() => import("./Pages/DiningPage"));
const LivingPage = React.lazy(() => import("./Pages/LivingPage"));
const BedroomPage = React.lazy(() => import("./Pages/BedroomPage"));
const HelpPage = React.lazy(() => import("./Pages/HelpPage"));

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
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full left-0 right-0 top-0 bottom-0 mx-auto">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#1e1e1e"
              secondaryColor="#797979"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        }
      >
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
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Suspense>
      <FooterSection />
    </>
  );
};
