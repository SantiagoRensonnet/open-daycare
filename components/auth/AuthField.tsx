const INPUT_VARIANTS = {
  default: "px-[16px] py-[14px] text-[15px]",
  code: "px-[16px] py-[14px] font-display text-[18px] font-bold tracking-[3px]",
} as const;

export function AuthField({
  id,
  label,
  type = "text",
  defaultValue,
  placeholder,
  variant = "default",
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  defaultValue?: string;
  placeholder?: string;
  variant?: keyof typeof INPUT_VARIANTS;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[8px] block text-[12px] font-bold tracking-[.7px] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-ink placeholder:text-[#B6A99B] focus:outline-none ${INPUT_VARIANTS[variant]}`}
      />
    </div>
  );
}
