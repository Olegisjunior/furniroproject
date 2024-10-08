import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ICheckoutItems } from "../store/checkout.slice";
import { CheckoutForm } from "../component/CheckoutForm";
import { useState } from "react";
import { ListOfItems } from "../component/ListOfItems";

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
  const [UserData, setUserData] = useState<Inputs>();
  const [isValid, setIsValid] = useState(false);

  const totalQuantity = checkoutState.quantity.reduce(
    (total, item) => total + item.quan,
    0
  );

  const proceedOrder = (UserData: Inputs, checkoutState: ICheckoutItems) => {
    alert(`Order success, ${UserData.firstName}!`);
    console.log(
      UserData,
      checkoutState.color,
      checkoutState.quantity,
      checkoutState.totalPrice,
      checkoutState.size
    );
  };

  const behavior = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };

  const handleDataFromForm = (data: Inputs, isValid: boolean) => {
    setUserData(data);
    setIsValid(isValid);
  };

  return (
    <>
      <div className="relative flex flex-col ">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit text-[48px] font-semibold  z-20">
          Checkout
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className="font-semibold">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/checkout" className="font-semibold">
            Cart
          </Link>
        </div>

        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner}
          alt=""
        />
      </div>

      <div className="h-fit flex flex-col md:flex-row md:gap-x-10 md:container md:mx-auto my-10">
        {checkoutState.items.length > 0 ? (
          <div className="LeftSide w-full md:w-[50%]">
            <CheckoutForm func={handleDataFromForm} />
          </div>
        ) : (
          <div className="w-[100%] flex justify-center items-center h-[30vh]">
            <h1 className="text-2xl font-semibold tracking-wider		">
              Checkout is empty, back to
              <span className="font-semibold underline">
                <Link to="/shop" onClick={behavior}>
                  {" "}
                  shop{" "}
                </Link>
              </span>
              or
              <span className="font-semibold underline">
                <Link onClick={behavior} to="/cart">
                  {" "}
                  cart{" "}
                </Link>
              </span>
              .
            </h1>
          </div>
        )}
        {checkoutState.items.length > 0 ? (
          <div className="RightSide w-full md:w-[40%] bg-gray-100 h-fit">
            <h1 className="text-2xl font-bold flex justify-center items-center my-5">
              Order Summary
            </h1>

            <div
              className="flex 
          items-center flex-col"
            >
              <div className="flex gap-20">
                <h1 className="text-l font-semibold">Price Details</h1>
                <h1 className="text-l font-semibold">
                  (items {totalQuantity})
                </h1>
              </div>
              <ListOfItems checkoutState={checkoutState} />
              <hr className="w-[80%] h-[2px] bg-[#797979] my-2" />
              <div className="flex gap-24 ">
                <p className="text-xl font-semibold">Total Price</p>
                <p className="flex items-center justify-center text-xl font-bold text-[#B88E2F]">
                  {checkoutState.totalPrice}₴
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center my-5">
              <Link to="/cart" className=" rounded-[2rem] p-3 hover:underline">
                Back to Cart
              </Link>

              <button
                onClick={() =>
                  UserData && proceedOrder(UserData, checkoutState)
                }
                disabled={checkoutState.items.length === 0 || !isValid}
                className="border-2 px-6 py-4 rounded-md border-black "
              >
                Place order
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
