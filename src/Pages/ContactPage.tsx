import { Link } from "react-router-dom";
import banner5 from "../../assets/banner5.jpg";
import phone from "../../assets/phone.png";
import address from "../../assets/address.png";
import clock from "../../assets/clock.png";
import { ContactPageForm } from "../component/ContactPageForm";

export const ContactPage = () => {
  return (
    <>
      <div className="relative flex flex-col mb-5">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Contact
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/contact" className="font-semibold">
            Contact
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner5}
          alt=""
        />
      </div>
      <div className="container mx-auto w-full max-h-full flex flex-col ">
        <div className="px-10 py-10">
          <h1 className="text-3xl font-bold flex justify-center">
            Get In Touch With Us
          </h1>
          <p className="text-md text-[#797979] text-center font-medium flex justify-center items-center">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us
            <br /> An Email. Our Staff Always Be There To Help You Out. Do Not
            Hesitate!
          </p>
        </div>
        <div className="2in1 max-w-full mx-auto flex-col flex md:flex-row gap-10 ">
          <div className="left  w-full flex flex-col gap-5 px-10 py-10 justify-center items-end">
            <div className="flex mx-auto gap-2">
              <img src={address} className="h-[30px]" />
              <p>
                Address
                <br />
                236 5th SE Avenue,
                <br />
                New York NY10000,
                <br />
                United States
              </p>
            </div>
            <div className="flex gap-2">
              <img src={phone} className="h-[35px]" />
              <p>
                Phone
                <br />
                Mobile: +(84) 546-6789
                <br />
                Hotline: +(84) 456-6789
              </p>
            </div>
            <div className="flex gap-2">
              <img src={clock} className="h-[25px]" />
              <p>
                Working Time
                <br />
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
          <div className="right  w-full flex flex-col gap-5 px-10 py-10 justify-start items-start">
            <ContactPageForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
