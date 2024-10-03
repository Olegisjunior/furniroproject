import collage1 from "../../assets/collage1.png";
import collage2 from "../../assets/collage2.png";
import collage3 from "../../assets/collage3.png";
import collage4 from "../../assets/collage4.png";
import collage5 from "../../assets/collage5.png";
import collage6 from "../../assets/collage6.png";
import collage7 from "../../assets/collage7.png";
import collage8 from "../../assets/collage8.png";

export const Collage = () => {
  return (
    <div className="max-w-[1440px] relative h-[900px] my-5  mx-auto">
      <div className="container mx-auto flex flex-col justify-center items-center mt-[20px]">
        <p className="text-[#616161] text-[20px] font-semibold">
          Share your setup with
        </p>
        <p className="text-[#3a3a3a] text-[40px] font-bold">#FuniroFurniture</p>
      </div>
      <img src={collage1} className="absolute h-[full] left-[0px] top-[50px]" />
      <img
        src={collage2}
        className="absolute h-[full] w-[420px] left-[30px] top-[390px]"
      />
      <img
        src={collage3}
        className="absolute h-[350px] w-[320px] left-[472px] top-[90px]"
      />
      <img
        src={collage4}
        className="absolute h-[full] w-[350px] left-[810px] top-[348px]"
      />
      <img
        src={collage5}
        className="absolute h-[360px] left-[1230px] top-[430px]"
      />
      <img
        src={collage6}
        className="absolute h-[240px] w-[350px] left-[810px] top-[90px]"
      />
      <img
        src={collage7}
        className="absolute left-[1181px] top-[50px] w-[355px] h-[full] "
      />
      <img
        src={collage8}
        className="absolute left-[500px] top-[460px]  h-[310px] w-[260px]"
      />
    </div>
  );
};
