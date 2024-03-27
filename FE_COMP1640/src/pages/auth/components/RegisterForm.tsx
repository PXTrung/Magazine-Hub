/* eslint-disable react/style-prop-object */
import Input from "../../../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../authValidationSchemas";
import { ENDPOINTS } from "../../../constants/endpoint";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../../constants/path";

const RegisterForm = () => {
   const [falcuties, setFalcuties] = useState([]);
   const [result, setResult] = useState(false);
   const [message, setMessage] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(registerSchema),
   });

   const getFalcutyList = async () => {
      try {
         const response = await fetch(ENDPOINTS.FALCUTY);
         if (!response.ok) {
            throw new Error("Failed to fetch data");
         }

         const data = await response.json();
         setFalcuties(data.items);

         return data;
      } catch (error: any) {
         console.error("Error fetching data:", error.message);
         throw error;
      }
   };

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      console.log(data);

      await fetch(ENDPOINTS.REGISTER, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (response.status === 200) {
               setResult(true);
            }
         })
         .catch((error) => {
            console.error("Lỗi:", error);
         });
   };

   useEffect(() => {
      getFalcutyList();
   }, []);

   return (
      <div>
         {result && (
            <Navigate
               to={{
                  pathname: `/${PATHS.AUTH.IDENTIFY}`,
               }}
               replace
            />
         )}
         <h1 className="text-2xl font-semibold mb-6">Register</h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between items-start">
               <Input
                  register={register}
                  errors={errors}
                  required
                  id="firstName"
                  label="First Name"
                  type="text"
                  placeholder="First name"
                  style="mr-2 flex-1"
               />
               <Input
                  register={register}
                  errors={errors}
                  required
                  id="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                  style="flex-1"
               />
            </div>
            <div className="relative mb-3">
               <label
                  htmlFor="falcuty"
                  className="mr-1 text-gray-700 text-base font-normal"
               >
                  Falcuty
               </label>
               <select
                  id="facultyId"
                  className="block appearance-none w-full bg-white border border-gray-400 mt-1 p-[10px] rounded leading-tight focus:outline-none"
                  defaultValue={falcuties?.[0]}
                  {...(register && register("facultyId", {}))}
               >
                  {falcuties?.map((falcuty: any) => {
                     return (
                        <option key={falcuty?.id} value={falcuty?.id}>
                           {falcuty?.name}
                        </option>
                     );
                  })}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-7 text-gray-700">
                  <svg
                     className="fill-current h-4 w-4"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                  >
                     <path d="M10 12L4 6h12z" />
                  </svg>
               </div>
            </div>
            <Input
               register={register}
               errors={errors}
               required
               id="email"
               label="Email"
               type="text"
               placeholder="example@gmail.com"
            />
            <Input
               register={register}
               errors={errors}
               required
               id="password"
               label="Password"
               type="password"
               placeholder="Enter your password"
            />
            <Input
               register={register}
               errors={errors}
               required
               id="confirmPassword"
               label="Confirm Password"
               type="password"
               placeholder="Confirm your password"
            />

            <div className="text-sm text-gray-500 mt-2 mb-6">
               By registering, you agree to the
               <span className="text-blue-600"> Terms and Conditions.</span>
            </div>

            <button
               type="submit"
               className="bg-blue-600 hover:opacity-[0.97] text-white p-2 rounded w-full"
            >
               Register
            </button>
         </form>
      </div>
   );
};

export default RegisterForm;
