"use client";

export default function FormSelect({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  placeholder = "Select an option",
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-wide text-blacky"
      >
        {label} {required && <span className="text-redy">*</span>}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-redy focus:border-transparent bg-white cursor-pointer uppercase text-gray-500 appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
