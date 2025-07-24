import { PiBellSimpleLight, PiInfoThin } from "react-icons/pi";

function Header() {
  return (
    <header className="grid grid-cols-[15rem_1fr] bg-white col-span-2 shadow-[20px_0_10px_rgba(0,0,0,0.2)] py-5">
      <div className="flex items-center justify-between col-span-2 col-start-2">
        <h1 className="text-black font-bold text-xl">
          Data Classification Dashboard
        </h1>

        <div className="flex gap-5 col-span-2 col-start-2 mr-10">
          <PiBellSimpleLight className="cursor-pointer text-[1.8rem]" />
          <PiInfoThin className="cursor-pointer text-[1.8rem]" />
        </div>
      </div>
    </header>
  );
}

export default Header;
