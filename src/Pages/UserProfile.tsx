import banner3 from "../../assets/banner3.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FormLogin } from "../component/FormLogin";
import { FormRegister } from "../component/FormRegister";

export const UserProfile = () => {
  const [formStatus, setFormState] = useState("log");

  const handleChangeForm = () => {
    if (formStatus === "log") {
      setFormState("reg");
    } else if (formStatus === "reg") {
      setFormState("log");
    }
  };

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          Profile
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/profile" className="font-semibold">
            Profile
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner3}
          alt=""
        />
      </div>
      <div>
        {formStatus === "log" ? <FormLogin /> : <FormRegister />}
        <div className="flex justify-center mb-10">
          <button type="button" onClick={handleChangeForm}>
            {formStatus === "log"
              ? `Don't have a account?`
              : `Already have a account?`}
          </button>
        </div>
      </div>
    </>
  );
};
