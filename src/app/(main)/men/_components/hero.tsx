import { copeland } from "@/fonts/font";

const Hero = () => {
  return (
    <section className="flex  bg-[url('/men-page/img-shirt-men-bg.png')] bg-cover bg-center text-white text-center py-60 relative">
      <div className="text-black text-left absolute left-0 top-1/2 transform -translate-y-1/2 w-full max-w-lg px-8 lg:pl-16">
        <h2
          className={`text-2xl lg:hidden leading-tight ${copeland.className} font-normal`}
        >
          Shirts That Do More
          <br />
          Than Fit.
        </h2>

        <h2
          className={`hidden lg:block text-3xl md:text-4xl lg:text-5xl leading-tight ${copeland.className} font-normal `}
        >
          Shirts That Do More
          <br />
          Than Fit.
        </h2>
        <p className="text-lg  font-light mt-4">
          Sharpen Your Style, Shirts That Speak
          <br />
          Confidence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
