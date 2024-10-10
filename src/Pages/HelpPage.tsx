import { Link } from "react-router-dom";

import banner4 from "../../assets/banner4.avif";

export const HelpPage = () => {
  return (
    <>
      <div className="relative flex flex-col mb-5 ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Help
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/help" className="font-semibold">
            Help
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner4}
          alt=""
        />
      </div>
      <div className="container mx-auto flex flex-col gap-5 h-fit">
        <div className="flex justify-center items-center font-bold text-3xl">
          Help
        </div>
        <div className="container flex flex-col gap-y-10 pt-5 pb-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <span>Payment Options</span>
            At our furniture store, we aim to provide you with flexible and
            secure payment options to enhance your shopping experience. We
            accept all major credit and debit cards, including Visa, MasterCard,
            and American Express, ensuring a seamless transaction process.
            Additionally, we offer payment through popular digital wallets like
            PayPal and Apple Pay, allowing you to make quick and safe payments
            with just a few clicks. For customers seeking more manageable
            payment plans, we partner with trusted financial institutions to
            offer financing options. With installment payment plans, you can
            spread the cost of your purchase over several months without the
            burden of upfront payments. Our financing options are designed to
            make it easier for you to furnish your home without straining your
            budget.
          </div>
          <hr />
          <div className="flex flex-col items-center justify-center gap-5">
            <span>Returns</span>
            We understand that purchasing furniture is a significant investment,
            and customer satisfaction is our top priority. If you are not
            completely satisfied with your purchase, we offer a hassle-free
            return policy. You can return or exchange items within 30 days of
            delivery, provided that the products are in their original condition
            and packaging. Simply contact our customer service team, and they
            will guide you through the return process. To ensure a smooth
            return, please retain all original packaging materials and avoid
            assembling the furniture if you are unsure about your purchase. We
            are happy to arrange for pick-up of larger items, and once we
            receive the returned item, we will process your refund promptly.
            Custom-made or clearance items may be subject to different return
            policies, which will be clearly stated at the time of purchase.
          </div>
          <hr />
          <div className="flex flex-col items-center justify-center gap-5">
            <span>Privacy Policies</span>
            Your privacy and the protection of your personal information are of
            utmost importance to us. Our privacy policy outlines how we collect,
            use, and safeguard the data you provide when shopping with us. We
            collect only the necessary information required to process your
            orders, such as your name, contact details, and payment information,
            and we use this data exclusively for order fulfillment, customer
            support, and enhancing your shopping experience. We are committed to
            maintaining the confidentiality of your information and do not share
            or sell your data to third parties for marketing purposes. All
            transactions made on our site are encrypted using secure socket
            layer (SSL) technology to protect your financial details. If you
            choose to sign up for our newsletter, we will only send you updates
            about special offers and promotions with your consent, and you can
            opt out at any time.
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
