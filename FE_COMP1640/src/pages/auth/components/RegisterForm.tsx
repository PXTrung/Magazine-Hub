/* eslint-disable react/style-prop-object */
import Input from "../../../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../authValidationSchemas";
import { ENDPOINTS } from "../../../api";
import Dropdown from "../../../components/Dropdown/index";

const RegisterForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(registerSchema),
   });

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
            console.log("status: ", response.status);
            console.log("message: ", response.json);
         })
         .catch((error) => {
            console.error("Lỗi:", error);
         });
   };

   return (
      <div>
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
            <Dropdown id="facuty" label="Facuty" register={register} />
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
