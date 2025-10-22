export default function PriceCard({name, price, billingCycle, features, customers, revenue, currency}: {
    name: string;
    price: number;
    billingCycle: string;
    features: string[];
    customers: number;
    revenue: number;
    currency: string;
}) {
    return (
        // <div className="border border-gray-300 rounded-[16px] px-6 py-5 w-[331px] max-w-sm">
        //     <h2 className="text-base font-normal mb-1">Basic</h2>
        //     <p className="text-black text-[24px] font-normal mb-4">$49 <span className="text-gray-700 text-[16px] font-normal">/month</span></p>
        //     <div>
        //         <ul className="list-disc list-inside text-gray-700 text-[14px] font-normal space-y-1 mb-6 type:disc color:gray-700">
        //             <li>Up to 10 users</li>
        //             <li>1,000 AI credits/month</li>
        //             <li>Email support</li>
        //             <li>Basic analytics</li>
        //         </ul>
                
        //     </div>
        //     <hr className="h-[1px] w-full border-[#C4CDD5]"/>
        //     <div className="flex justify-between items-center mt-5">
        //         <div>
        //             <p className="text-gray-600 text-[14px] font-normal">Customers</p>
        //             <span className="text-black text-[18px] font-normal flex items-center justify-center">12</span>
        //         </div>
        //         <div>
        //             <p className="text-gray-600 text-[14px] font-normal">Revenue</p>
        //             <span className="text-black text-[18px] font-normal flex items-center justify-center">$2,205</span>
        //         </div>
        //     </div>
        // </div>
        <div className="h-fit border border-gray-300 rounded-[16px] px-6 py-5 w-[331px] max-w-sm">
            <h2 className="text-base font-normal mb-1">{name}</h2>
            <p className="text-black text-[24px] font-normal mb-4">{price} <span className="text-gray-700 text-[16px] font-normal">/{billingCycle}</span></p>
            <div>
                <ul className="list-disc list-inside text-gray-700 text-[14px] font-normal space-y-1 mb-6 type:disc color:gray-700">
                    {
                        features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))
                    }
                </ul>
                
            </div>
            <div className="">
                <hr className="h-[1px] w-full border-[#C4CDD5]"/>
                <div className="flex justify-between items-center mt-5">
                    <div>
                        <p className="text-gray-600 text-[14px] font-normal">Customers</p>
                        <span className="text-black text-[18px] font-normal flex items-center justify-center">{customers}</span>
                    </div>
                    <div>
                        <p className="text-gray-600 text-[14px] font-normal">Revenue</p>
                        <span className="text-black text-[18px] font-normal flex items-center justify-center">{currency}{revenue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}