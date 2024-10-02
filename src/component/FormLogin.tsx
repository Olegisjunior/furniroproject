import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  Email: string;
  Password: string;
};

export const FormLogin = () => {
  const {
    register: registerField,
    handleSubmit: handleSub,
    reset,
    formState: { errors: err },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
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
  );
};
