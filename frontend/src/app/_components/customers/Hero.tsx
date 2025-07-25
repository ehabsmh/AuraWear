import Image from "next/image";

const images = ["/men-fashion.jpg", "/8.jpg"];

function Hero() {
  return (
    <section id="hero" className="grid grid-cols-2 mb-32">
      {images.map((src, index) => (
        <div key={index} className="relative group overflow-hidden">
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            width={800}
            height={600}
            className="object-fit w-full md:h-[calc(100vh-7rem)] h-[calc(50vh-7rem)] cursor-pointer group-hover:scale-110 duration-300"
            quality={100}
          />
          <div className="absolute duration-300 group-hover:scale-150 group-hover:opacity-100 opacity-0 bg-gray-700/60 top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white text-2xl font-bold cursor-pointer">
            <p>{index === 0 ? "Men" : "Women"}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Hero;
