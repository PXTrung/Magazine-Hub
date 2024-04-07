import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";

interface InputProps {
   label: string;
   id: string;
   type?: string;
   required?: boolean;
   register?: UseFormRegister<FieldValues>;
   errors?: FieldErrors;
   disabled?: boolean;
   placeholder?: string;
   value?: string;
   link?: string;
   style?: string;
   accept?: string;
}
const Input = ({
   label,
   id,
   type,
   required,
   register,
   errors,
   disabled,
   placeholder,
   value,
   style,
   accept,
   link,
}: InputProps) => {
   const [inputValue, setInputValue] = useState(value);
   useEffect(() => {
      setInputValue(value);
   }, [value]);

   return (
      <>
         <div className={clsx("mb-3", style?.toString())}>
            <label
               htmlFor={id}
               className="mr-1 text-gray-700 text-base font-normal"
            >
               {label}
            </label>
            {link && (
               <a
                  href={link}
                  target="_blank"
                  className="text-blue-600 text-base"
                  rel="noreferrer"
               >
                  (Current image)
               </a>
            )}
            <input
               id={id}
               type={type}
               disabled={disabled}
               placeholder={placeholder}
               autoComplete="new-password"
               defaultValue={inputValue}
               accept={accept || "text"}
               {...(register && register(id, { required }))}
               className={clsx(
                  "mt-1 p-2 w-full border rounded outline-gray-700",
                  errors?.[id]
                     ? "border-rose-500 outline-rose-500 ring-0"
                     : "border-gray-400",
               )}
            />

            {errors?.[id] && (
               <span className="text-red-500 text-xs">
                  *{errors?.[id]?.message?.toString()}
               </span>
            )}
         </div>
      </>
   );
};
export default Input;
