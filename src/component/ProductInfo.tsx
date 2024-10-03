import { IFurniture } from "../store/furnitureApi";

interface ProductInfoProps {
  data: IFurniture | undefined;
  setIsActive2: React.Dispatch<React.SetStateAction<number>>;
  isActive2: number;
  size: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  data,
  setIsActive2,
  isActive2,
  size,
}) => {
  const desc_buttons = ["Description", "Additional Information"];

  const handleClick2 = (index: number) => {
    setIsActive2(index);
  };

  return (
    <>
      <div className="flex flex-col justify-around items-center w-full min-h-[300px] h-fit ">
        <div className="flex justify-center items-center gap-16 mb-10">
          {desc_buttons.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClick2(index)}
                className={
                  isActive2 === index
                    ? `font-semibold text-[24px]`
                    : `font-semibold text-[24px] text-[#797979]`
                }
              >
                {item}
              </button>
            );
          })}
        </div>

        {isActive2 === 0 ? (
          <p className="w-[1200px] text-[#797979]">{data?.desc}</p>
        ) : (
          <div className="flex justify-around w-full">
            <div className="flex items-center gap-10">
              <table className="border-collapse text-[18px]">
                <tbody>
                  {data?.prod_info2?.Length && data?.prod_info.Length && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Length
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {size === "l"
                          ? data?.prod_info.Length
                          : data?.prod_info2.Length}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Width && data?.prod_info2?.Width && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Width
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {size === "l"
                          ? data?.prod_info.Width
                          : data?.prod_info2.Width}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Height && data?.prod_info2?.Height && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0">
                        Height
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {size === "l"
                          ? data?.prod_info.Height
                          : data?.prod_info2.Height}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Material && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Material
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Material}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Frame_Material && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Frame Material
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Frame_Material}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Seating_Capacity && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Seating Capacity
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Seating_Capacity}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Finish && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Finish
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Finish}
                      </td>
                    </tr>
                  )}
                  {data?.prod_info.Model && (
                    <tr>
                      <th className="font-medium border-[1px] border-[solid] border-[#000000] text-center py-4 pr-5 pl-5 border-l-0 ">
                        Model
                      </th>
                      <td className="text-left border-[1px] border-[solid] border-[#000000] border-r-0 pl-4 pr-4">
                        {data?.prod_info.Model}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {data?.size_photo?.map((item, index) => {
              return (
                <>
                  <img src={item} key={index} className="h-[500px]" />
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
