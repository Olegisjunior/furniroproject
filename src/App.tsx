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

export const App = () => {
  return (
    <>
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
      </Routes>
      <FooterSection />
    </>
  );
};
