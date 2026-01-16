"use client";

export default function TimeSlotSelector({
    availableSlots = [],
    selectedSlot,
    onSlotSelect,
    format = "24h",
}) {
    const formatTime = (time) => {
        if (format === "24h") return time;
        const [hours, minutes] = time.split(":");
        const h = parseInt(hours, 10);
        const suffix = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${suffix}`;
    };

    return (
        <div className="space-y-2">
            {availableSlots.map((slot) => (
                <button
                    key={slot}
                    onClick={() => onSlotSelect(slot)}
                    className={`w-full px-4 py-2.5 rounded-md border text-[13px]
                        flex items-center gap-3
                        ${
                            selectedSlot === slot
                                ? "border-redy text-black ring-1 ring-redy"
                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                        }
                    `}
                >
                    <span className="text-[10px] text-redy">●</span>
                    {formatTime(slot)}
                </button>
            ))}
        </div>
    );
}
