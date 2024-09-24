import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import banner3 from "../../assets/banner3.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

type Inputs = {
  Email: string;
  Password: string;
};

type Inputs2 = {
  Email: string;
  Username: string;
  Password: string;
  secPassword: string;
};

export const UserProfile = () => {
  const {
    register: registerField,
    handleSubmit: handleSub,
    formState: { errors: err, isValid: isVal },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs2>();

  const onSubmitSec: SubmitHandler<Inputs2> = (data) => {
    console.log(data);
  };

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
        {formStatus === "log" ? (
          <form
            id="Form1"
            name="Form1"
            onSubmit={handleSub(onSubmit)}
            className="flex flex-col justify-center items-center py-5 gap-3"
          >
            <h1 className="flex justify-start items-center text-3xl font-bold mt-5">
              Login
            </h1>
            <label htmlFor="Email" className="">
              Email
            </label>

            <input
              {...registerField("Email", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                minLength: {
                  value: 3,
                  message: "This input start from 3 letters",
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "wrong email",
                },
              })}
              type="text"
              id="Email"
              name="Email"
              className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                err.Email ? ` border-[#ff0000] border-2` : null
              }`}
            />
            <ErrorMessage
              errors={err}
              name="Email"
              render={({ message }) => (
                <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
              )}
            />
            <label htmlFor="Password" className="">
              Password
            </label>
            <input
              {...registerField("Password", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                minLength: {
                  value: 8,
                  message: "This input start from 8 letters",
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/,
                  message:
                    "At least one lowercase letter(a - z) and one uppercase letter(A - Z) and numeric value(0 - 9)",
                },
              })}
              type="password"
              id="Password"
              name="Password"
              className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                err.Password ? ` border-[#ff0000] border-2` : null
              }`}
            />
            <ErrorMessage
              errors={err}
              name="Password"
              render={({ message }) => (
                <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
              )}
            />
            <button
              type="submit"
              className="border-[#1e1e1e] mt-2 border-solid border-2 text-white bg-black px-3 py-2 rounded-xl"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            id="Form2"
            name="Form2"
            onSubmit={handleSubmit(onSubmitSec)}
            className="flex flex-col justify-center items-center py-5 gap-3"
          >
            <h1 className="flex justify-start items-center text-3xl font-bold mt-5">
              Register
            </h1>
            <label htmlFor="Email" className="">
              Email
            </label>

            <input
              {...register("Email", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                minLength: {
                  value: 3,
                  message: "This input start from 3 letters",
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "wrong email",
                },
              })}
              type="text"
              id="Email"
              name="Email"
              className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                errors.Email ? ` border-[#ff0000] border-2` : null
              }`}
            />
            <ErrorMessage
              errors={errors}
              name="Email"
              render={({ message }) => (
                <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
              )}
            />
            <label htmlFor="Password" className="">
              Password
            </label>
            <input
              {...register("Password", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                minLength: {
                  value: 8,
                  message: "This input start from 8 letters",
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/,
                  message:
                    "At least one lowercase letter(a - z) and one uppercase letter(A - Z) and numeric value(0 - 9)",
                },
              })}
              type="password"
              id="Password"
              name="Password"
              className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                errors.Password ? ` border-[#ff0000] border-2` : null
              }`}
            />
            <ErrorMessage
              errors={errors}
              name="Password"
              render={({ message }) => (
                <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
              )}
            />
            <label htmlFor="2Password" className="">
              Confirm Password
            </label>
            <input
              {...register("secPassword", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                validate: (val: string) => {
                  const password = watch("Password");
                  if (password !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              type="password"
              id="secPassword"
              name="secPassword"
              className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                errors.secPassword ? ` border-[#ff0000] border-2` : null
              }`}
            />
            <ErrorMessage
              errors={errors}
              name="secPassword"
              render={({ message }) => (
                <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
              )}
            />
            <button
              type="submit"
              className="border-[#1e1e1e] mt-2 border-solid border-2 text-white bg-black px-3 py-2 rounded-xl"
            >
              Register
            </button>
          </form>
        )}
        <div className="flex justify-center mb-10">
          <button type="button" onClick={handleChangeForm}>
            {formStatus === "log"
              ? `Don't have a account?`
              : `Already have a account?`}
          </button>
        </div>
        {/* <label htmlFor="phone" className="">
            Phone number
          </label>
          <input
            {...register("phone", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 9,
                message: "This input start from 9 numbers",
              },
              maxLength: {
                value: 12,
                message: "This input exceed 10 numbers",
              },
              pattern: {
                value: /[0-9]/,
                message: "This input is number only.",
              },
            })}
            type="text"
            id="phone"
            name="phone"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.phone ? ` border-[#ff0000] border-2 border` : null
            }`}
          />
          <p className="text-[0.8rem] text-gray-700">
            We need this in case we have to contact you about your order. Please
            enter numbers only.
          </p>
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          />

          <label htmlFor="email">Email address</label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 5,
                message: "This input start from 4 letters",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "wrong email",
              },
            })}
            type="text"
            name="email"
            id="email"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.email ? ` border-[#ff0000] border-solid border-2` : null
            }`}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          />

          <h1 className="text-[1.25rem] font-[800]">Address details</h1>

          <label htmlFor="Country" className="">
            Country
          </label>
          <input
            {...register("country", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 4,
                message: "This input start from 4 letters",
              },
              maxLength: {
                value: 20,
                message: "This input exceed 20 letters",
              },
            })}
            type="text"
            id="country"
            name="country"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.country ? ` border-[#ff0000] border-2 border` : null
            }`}
          />
          <p className="text-[0.8rem] text-gray-700 text-center">
            Note: We do not offer delivery to PO boxes, hotels, and freight
            forwarding addresses. Bikes cannot be delivered to FPO/APO addresses
            due to size restrictions on deliveries.
          </p>
          <ErrorMessage
            errors={errors}
            name="country"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          />

          <label htmlFor="city" className="">
            City / Town
          </label>
          <input
            {...register("city", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 2,
                message: "This input start from 2 letters",
              },
              maxLength: {
                value: 20,
                message: "This input exceed 20 letters",
              },
            })}
            type="text"
            id="city"
            name="city"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.city ? ` border-[#ff0000] border-2 border` : null
            }`}
          />
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          />

          <label htmlFor="street" className="">
            Street address
          </label>
          <input
            {...register("street", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 2,
                message: "This input start from 2 letters",
              },
              maxLength: {
                value: 30,
                message: "This input exceed 30 letters",
              },
            })}
            type="text"
            id="street"
            name="street"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.street ? ` border-[#ff0000] border-2 border` : null
            }`}
          />
          <ErrorMessage
            errors={errors}
            name="street"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          />

          <label htmlFor="zip" className="">
            ZIP/postal code
          </label>
          <input
            {...register("zip", {
              required: {
                value: true,
                message: "This is required.",
              },
              minLength: {
                value: 4,
                message: "This input start from 4 letters",
              },
              maxLength: {
                value: 6,
                message: "This input exceed 6 letters",
              },
              pattern: {
                value: /[0-9]/,
                message: "This input is number only.",
              },
            })}
            type="text"
            id="zip"
            name="zip"
            className={`w-[320px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
              errors.zip ? ` border-[#ff0000] border-2 border` : null
            }`}
          />
          <ErrorMessage
            errors={errors}
            name="zip"
            render={({ message }) => (
              <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
            )}
          /> */}
      </div>
    </>
  );
};
