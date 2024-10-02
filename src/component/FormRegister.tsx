import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Inputs2 = {
  Email: string;
  Username: string;
  Password: string;
  secPassword: string;
};

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs2>();

  const onSubmitSec: SubmitHandler<Inputs2> = (data) => {
    console.log(data);
  };

  return (
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
  );
};
