import { Link } from "react-router-dom";

export const FooterSection = () => {
  const behavior = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };
  return (
    <>
      <hr className="w-[full] h-[2px] bg-[#3a3a3a] mb-[40px]" />
      <footer className="min-h-[320px] h-[60vh] pb-20 gap-y-5 max-w-full  flex flex-col justify-center md:flex-row md:justify-around   ">
        <div className="block1 flex flex-col md:gap-y-[100px] gap-y-[20px]">
          <span className="text-[24px] font-bold">Furniro.</span>
          <p>
            400 University Drive Suite 200 Coral
            <br /> Gables,
            <br /> FL 33134 USA
          </p>
        </div>
        <div className="block2 flex flex-col md:gap-y-[40px] gap-y-[10px] ">
          <span className="text-[24px] font-bold">Links</span>
          <Link onClick={behavior} to="/">
            Home
          </Link>
          <Link onClick={behavior} to="/shop">
            Shop
          </Link>
          <Link onClick={behavior} to="/about">
            About
          </Link>
          <Link onClick={behavior} to="/contact">
            Contact
          </Link>
        </div>
        <div className="block3 flex flex-col md:gap-y-[40px] gap-y-[10px]">
          <span className="text-[24px] font-bold">Help</span>
          <p>Payment Options</p>
          <p>Returns</p>
          <p>Privacy Policies</p>
        </div>
      </footer>
    </>
  );
};
