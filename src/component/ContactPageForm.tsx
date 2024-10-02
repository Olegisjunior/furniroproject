import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  Name: string;
  Email: string;
  Subject: string;
  UserMessage: string;
};

export const ContactPageForm = () => {
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
    <>
      <form
        id="Form1"
        name="Form1"
        onSubmit={handleSub(onSubmit)}
        className="flex flex-col justify-center items-center py-5 gap-3"
      >
        <label htmlFor="Name" className="">
          Your name
        </label>

        <input
          {...registerField("Name", {
            required: {
              value: true,
              message: "This is required.",
            },
            minLength: {
              value: 2,
              message: "This input start from 2 letters",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "wrong symbols",
            },
          })}
          type="text"
          id="Name"
          name="Name"
          placeholder="abc"
          className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
            err.Name ? ` border-[#ff0000] border-2` : null
          }`}
        />
        <ErrorMessage
          errors={err}
          name="Name"
          render={({ message }) => (
            <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
          )}
        />
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
          type="email"
          id="Email"
          name="Email"
          placeholder="abc@gmail.com"
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
        <label htmlFor="Subject" className="">
          Subject
        </label>
        <input
          {...registerField("Subject", {
            required: {
              value: true,
              message: "This is required.",
            },
            minLength: {
              value: 8,
              message: "This input start from 8 letters",
            },
            pattern: {
              value: /[A-Za-z0-9]/,
              message:
                "At least one lowercase letter(a - z) and one uppercase letter(A - Z) and numeric value(0 - 9)",
            },
          })}
          type="text"
          placeholder="Optional"
          id="Subject"
          name="Subject"
          className={`w-[280px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
            err.Subject ? ` border-[#ff0000] border-2` : null
          }`}
        />
        <ErrorMessage
          errors={err}
          name="Subject"
          render={({ message }) => (
            <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
          )}
        />

        <label htmlFor="UserMessage" className="">
          Message
        </label>
        <textarea
          {...registerField("UserMessage", {
            required: {
              value: true,
              message: "This is required.",
            },
            minLength: {
              value: 20,
              message: "This input start from 20 letters",
            },
            pattern: {
              value: /[A-Za-z0-9]/,
              message: "Wrong symbols",
            },
          })}
          id="UserMessage"
          name="UserMessage"
          placeholder="enter your message"
          className={`w-[280px] flex-wrap h-[10rem] resize-none focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
            err.UserMessage ? ` border-[#ff0000] border-2` : null
          }`}
        />
        <ErrorMessage
          errors={err}
          name="UserMessage"
          render={({ message }) => (
            <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
          )}
        />

        <button
          type="submit"
          className="border-[#1e1e1e] mt-2 border-solid border-2 text-white bg-black px-3 py-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </>
  );
};
