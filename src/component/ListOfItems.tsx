import { useGetFurnituresQuery } from "../store/furnitureApi";
import { ICheckoutItems } from "../store/checkout.slice";

interface ListOfItems {
  checkoutState: ICheckoutItems;
}

export const ListOfItems: React.FC<ListOfItems> = ({ checkoutState }) => {
  const { data } = useGetFurnituresQuery();

  return (
    <>
      {data &&
        data
          .filter((d) => checkoutState.items.find((f) => f.id === d.id))
          .map((i) => {
            const dataColor = checkoutState.color.find(
              (we) => we.productId === i.id
            )?.color;

            const ProdSize = checkoutState.size.find(
              (it) => it.id === i.id
            )?.size;

            return (
              <div className=" flex flex-col ">
                <div className="flex gap-5 ">
                  <div
                    style={{ backgroundColor: dataColor }}
                    className={`w-[20px] h-[20px] rounded-[50%]`}
                  ></div>
                  <p className="truncate w-[260px]  text-l font-semibold">
                    {i.name}
                  </p>
                  <span>x</span>
                  <p className=" text-l font-semibold">
                    {checkoutState.items.find((f) => f.id === i.id)?.quantity}
                  </p>
                </div>
                <p className="text-center  text-l font-semibold">
                  size: {ProdSize ? ProdSize : "one size"}
                </p>
              </div>
            );
          })}
    </>
  );
};
