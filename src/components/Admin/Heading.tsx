
export default function Heading({heading1,heading2}:{heading1:string,heading2:string}) {
  return (
    // <div className="mb-8">
    //    <h2 className="text-xl md:text-3xl font-bold text-[#2D2D2D] mb-1">{heading1}</h2>
    //    <p className="text-[#212B36] text=base md:text-lg line-clamp-2">{heading2}</p>
    // </div>
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-[#2D2D2D] mb-1">
        {heading1}
      </h2>
      <p className=" text-sm sm:text-base md:text-lg text-[#212B36] line-clamp-2">
        {heading2}
      </p>
    </div>

  )
}
