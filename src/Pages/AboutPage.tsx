import { Link } from "react-router-dom";
import img from "../../assets/about_Img.jpg";
import banner4 from "../../assets/banner4.avif";

export const AboutPage = () => {
  return (
    <>
      <div className="relative flex flex-col mb-5">
        <p className="absolute  m-auto left-0 top-0 right-0 bottom-0 w-fit h-fit  text-[48px] font-semibold  z-20">
          About us
        </p>
        <div className="z-20 flex absolute m-auto left-0 top-[80px] right-0 bottom-0 w-fit h-fit gap-5">
          <Link to="/" className=" font-semibold   ">
            Home
          </Link>
          <span className="font-semibold">{`>`}</span>
          <Link to="/about" className="font-semibold">
            About us
          </Link>
        </div>
        <img
          className="w-full h-[320px] object-cover opacity-80 z-10"
          src={banner4}
          alt=""
        />
      </div>
      <div className="container mx-auto flex flex-col gap-5">
        <div className="flex justify-center items-center font-bold text-3xl">
          About Us
        </div>
        <div className="container text-ce flex justify-center items-center flex-col gap-3 text-lg">
          <span className="w-full font-bold">About Us</span>
          At Furniro, we love to create products and experiences that make
          everyday living fun and fabulous. Furniro products are created for
          customers who love comfort and trendy designs at accessible prices
          without compromising quality and service.
          <span className="w-full font-bold">How we started </span>As a
          refreshingly modern mattress brand, Furniro launched in 2017 to solve
          the many unmet needs of the Indian mattress shopper. Confusing jargon,
          little or no time to try the mattress, high prices, over-dependence on
          the salesperson and no return options made shopping for mattresses a
          miserable experience. By introducing the radical ‘bed-in-a-box’
          concept along with the revolutionary 100 Night Free Trial, we
          ultimately challenged the way India shops for mattresses. We
          transformed it into an easy peasy shopping experience for everyone.
          Shoppers could replace the confusing, exhausting environment of the
          traditional mattress store with the comfort of shopping at home, 24/7
          customer service and doorstep delivery. Our 100 Nights Free Trial
          meant one could take home the mattress for a test drive for full 100
          Nights before choosing to commit or avail full refund on return. Our
          unique offerings quickly made us the internet’s fastest-growing D2C
          mattress brand. We did it by sticking to a few core principles:
          Offering a fabulous product for a fair price, providing the absolute
          best customer service and with zero compromises on quality. We didn’t
          stop here. We quickly extended the Furniro way of thinking to beyond
          mattresses all things home.{" "}
          <span className="w-full font-bold ">Who we are today</span> Today,
          Furniro is a complete home lifestyle brand offering mattresses,
          furniture, home decor and much more. Furniro’s home lifestyle range is
          designed to elevate the home with beautiful aesthetics and make
          everyday living easy and exciting. The brand’s uncompromising
          commitment to quality ensures that the products are made from
          high-quality materials and are long-lasting. The products are designed
          to keep customer needs at the centre and solve the multiple new-age
          home living requirements like work, study, leisure, relaxation, and
          more. Furniro’s wide range has the potential to transform any nook
          into a comfy, trendy space. From being India’s online fastest growing
          mattress brand today, we have been recognised by one of the
          fastest-growing D2C brands in the country by a leading Indian media
          platform known for its end-to-end coverage of Indian start-ups and
          entrepreneurs. There’s nothing we like more than an empty room and a
          head full of ideas. More thrills on the ride ahead.
        </div>
        <img
          src={img}
          className="h-[300px] w-full object-cover object-center mb-5"
        />
      </div>
    </>
  );
};
