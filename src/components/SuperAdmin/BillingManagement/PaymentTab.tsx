import type { Payment } from "../../../types/SuperAdmin/Billing&Subscription";

export default function PaymentTab({
    payment,
    setPayment
}: {
    payment: Payment[];
    setPayment: React.Dispatch<React.SetStateAction<Payment[]>>;
}) {
    
    const handleTogglePayment = (id: number) => {
        setPayment((prev) =>
            prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))

        );
    };
    const handleRetryChange = (id: number, value: number) => {
        setPayment((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, retryDelay: value } : p
            )
        );
    }
    return (
        <div>
            {
                payment.map((payment) => (
                    <div key={payment.id} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{payment.name}</h3>
                                <p className="text-sm text-gray-600">{payment.description}</p>
                            </div>

                            {payment.name !== "Failed Payment Retry" && (
                                <div
                                    onClick={() => handleTogglePayment(payment.id)}
                                    className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors ${payment.enabled ? "bg-orange-500" : "bg-gray-300"
                                        }`}
                                >
                                    {/* Knob */}
                                    <div
                                        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${payment.enabled ? "translate-x-7" : "translate-x-0"
                                            }`}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Retry Delay input below the flex row */}
                        {payment.name === "Failed Payment Retry" && (
                            <div className="mt-2">
                                <label className="text-sm text-gray-700 mb-1 block">Retry Delay (times)</label>
                                <input
                                    type="number"
                                    value={payment.retryDelay}
                                    min={0}
                                    onChange={(e) => handleRetryChange(payment.id, Number(e.target.value))}
                                    className="mt-1 block w-24 border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                        )}
                    </div>

                ))}
        </div>
    )
}
