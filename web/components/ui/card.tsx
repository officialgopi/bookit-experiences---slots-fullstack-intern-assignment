import { IExperience } from "@/types";

const Card = ({
  title = "Kayaking",
  place = "Udupi",
  imageUrl = "https://media.istockphoto.com/id/483724081/photo/yosemite-valley-landscape-and-river-california.jpg?s=2048x2048&w=is&k=20&c=j0OSpP2sAz582wDP0t28BzmwSMb0BJ2li7koJ2yROcA=",
  description = "Curated small-group experience. Certified guide. Safety first with gear included.",
  cost = 999,
}: Partial<IExperience>) => {
  return (
    <div className="flex flex-col w-[280px] h-[312px] rounded-xl bg-[#F0F0F0] overflow-hidden ">
      <img src={imageUrl} alt="image" className="w-full h-[170px]" />
      <div className="flex-1 py-3 px-4 gap-5 flex flex-col  ">
        <div className="w-full gap-3 flex flex-col ">
          <div className="w-full flex items-center justify-between h-6 ">
            <h3 className="text-base leading-5 font-medium text-[#161616]">
              {title}
            </h3>
            <span className="text-[11px] leading-4 px-2 py-1 bg-[#D6D6D6] text-[#161616] rounded">
              {place}
            </span>
          </div>
          <span className="text-xs leading-4 text-[#6C6C6C]">
            {description}
          </span>
        </div>
        <div className="w-full flex items-center justify-between ">
          <div className="flex gap-1.5 items-center">
            <div className="text-[12px] leading-4 text-[#161616]">From</div>
            <div className="  text-[#161616] font-semibold text-[20px] leading-6">
              ₹{cost}
            </div>
          </div>
          <button className="bg-[#FFD643] text-[#161616] rounded-sm py-1.5 px-2 text-[14px] leading-4.5">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
