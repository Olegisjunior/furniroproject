import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetFurnituresQuery } from "../store/furnitureApi";
import { ICheckoutItems } from "../store/checkout.slice";

type Inputs = {
  firstName: string;
  secondName: string;
  phone: number;
  country: string;
  city: string;
  street: string;
  zip: number;
  email: string;
};

export const Checkout = () => {
  const checkoutState = useSelector((state: RootState) => state.checkout);
  const { data } = useGetFurnituresQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    proceedOrder(data, checkoutState);

  const totalQuantity = checkoutState.quantity.reduce(
    (total, item) => total + item.quan,
    0
  );

  console.log(checkoutState.color);

  const proceedOrder = (UserData: Inputs, checkoutState: ICheckoutItems) => {
    alert("Order succces!");
    console.log(
      UserData,
      checkoutState.items,
      checkoutState.quantity,
      checkoutState.totalPrice
    );
  };

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute text-[48px] font-semibold left-[848px] top-[110px] z-20">
          Checkout
        </p>
        <div className="z-20">
          <Link
            to="/"
            className="absolute font-semibold left-[900px] top-[170px]"
          >
            Home
          </Link>
          <span className="absolute left-[953px] font-semibold top-[170px]">{`>`}</span>
          <Link
            to="/cart"
            className="absolute left-[970px] font-semibold top-[170px]"
          >
            Cart
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>
      <div className="h-fit flex gap-x-10 container mx-auto my-10">
        <div className="LeftSide w-[50%]">
          <form
            id="Form1"
            name="Form1"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center py-5 gap-3"
          >
            <h1 className="flex justify-start items-center text-3xl font-bold mt-5">
              Billing details
            </h1>
            <div className="flex justify-between gap-10">
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="firstName" className="">
                  First name
                </label>

                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This is required.",
                    },
                    minLength: {
                      value: 3,
                      message: "This input start from 3 letters",
                    },
                    maxLength: {
                      value: 20,
                      message: "This input exceed 20 letters",
                    },
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "This input is letters only.",
                    },
                  })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`w-[140px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                    errors.firstName
                      ? ` border-[#ff0000] border-2 border`
                      : null
                  }`}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
                  )}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="secondName" className="">
                  Last name
                </label>
                <input
                  {...register("secondName", {
                    required: {
                      value: true,
                      message: "This is required.",
                    },
                    minLength: {
                      value: 3,
                      message: "This input start from 3 letters",
                    },
                    maxLength: {
                      value: 20,
                      message: "This input exceed 20 letters",
                    },
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "This input is letters only.",
                    },
                  })}
                  type="text"
                  id="secondName"
                  name="secondName"
                  className={`w-[140px] h-[2rem] focus:outline-none border-[#1e1e1e] border border-1 focus:border-2 p-4 shadow-xl rounded-md ${
                    errors.secondName
                      ? ` border-[#ff0000] border-2 border`
                      : null
                  }`}
                />
                <ErrorMessage
                  errors={errors}
                  name="secondName"
                  render={({ message }) => (
                    <p className="text-[#ff0000] text-[0.8rem]">{message}</p>
                  )}
                />
              </div>
            </div>

            <label htmlFor="phone" className="">
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
              We need this in case we have to contact you about your order.
              Please enter numbers only.
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
              forwarding addresses. Bikes cannot be delivered to FPO/APO
              addresses due to size restrictions on deliveries.
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
            />
            <button
              type="submit"
              className="border-[#1e1e1e] border-solid border-2 text-white bg-black px-3 py-2 rounded-xl"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="RightSide w-[30%] bg-gray-100 h-fit">
          <h1 className="text-2xl font-bold flex justify-center items-center my-5">
            Order Summary
          </h1>

          <div
            className="flex 
          items-center flex-col"
          >
            <div className="flex gap-20">
              <h1 className="text-l font-semibold">Price Details</h1>
              <h1 className="text-l font-semibold">(items {totalQuantity})</h1>
            </div>
            {data &&
              data
                .filter((d) => checkoutState.items.includes(d.id))
                .map((i) => {
                  return (
                    <div className="flex gap-5">
                      <div
                        className={`w-[20px] h-[20px] rounded-[50%] bg-[${checkoutState.color}] `}
                      ></div>
                      <p className="truncate w-[260px]">{i.name}</p>
                      <span>x</span>
                      <p>
                        {
                          checkoutState.quantity.find(
                            (item) => item.id === i.id
                          )?.quan
                        }
                      </p>
                    </div>
                  );
                })}
            <hr className="w-[80%] h-[2px] bg-[#797979] my-2" />
            <div className="flex gap-24 ">
              <p className="text-xl font-semibold">Total Price</p>
              <p className="flex items-center justify-center text-xl font-bold text-[#B88E2F]">
                {checkoutState.totalPrice}₴
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center my-5">
            <Link to="/shop" className=" rounded-[2rem] p-3 hover:underline">
              Back to Store
            </Link>

            <button
              //@ts-ignore
              onClick={proceedOrder}
              disabled={checkoutState.items.length === 0}
              className="border-2 px-6 py-4 rounded-md border-black "
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
