
export default function Heading2({heading1,heading2}:{heading1:string,heading2:string}) {
  return (
    <div className="mb-8">
       <h2 className="text-2xl font-medium text-[#2D2D2D] mb-1">{heading1}</h2>
       <p className="text-[#454F5B]  line-clamp-2">{heading2}</p>
    </div>
  )
}
