
export default function Heading({heading1,heading2}:{heading1:string,heading2:string}) {
  return (
    <div className="mb-8">
       <h2 className="text-3xl font-bold text-[#2D2D2D] mb-1">{heading1}</h2>
       <p className="text-[#212B36] text-lg line-clamp-2">{heading2}</p>
    </div>
  )
}
