/* eslint-disable react/style-prop-object */
import Input from "../../../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../authValidationSchemas";

const RegisterForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(registerSchema),
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log(data);

      // await fetch("http://localhost:8000/api/v1/users/register", {
      //    method: "POST",
      //    headers: {
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify(user),
      // })
      //    .then((response) => {
      //       console.log("status: ", response.status);
      //       console.log("message: ", response.json);
      //    })
      //    .catch((error) => {
      //       console.error("Lỗi:", error);
      //    });
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
         <div className="mt-3">
            <div className="relative flex justify-center text-xs overflow-hidden">
               <span
                  className="relative font-normal text-gray-600 uppercase
                  before:block before:w-[180px] before:h-[1px] before:absolute before:top-[8px] before:right-[40px] before:bg-gray-200
                  after:block after:w-[180px] after:h-[1px] after:absolute after:top-[8px] after:left-[40px] after:bg-gray-200"
               >
                  or
               </span>
            </div>

            <div className="mt-3 flex justify-center gap-4 text-gray-500 hover:text-gray-700 rounded border hover:border-gray-700 transition-all duration-100">
               <button
                  className="w-full flex flex-row justify-center items-center p-2 "
                  onClick={() => {}}
               >
                  <img
                     src="/assets/icons/google-logo.png"
                     alt=""
                     className="w-4 h-4 mr-3"
                  />
                  <span className="text-base ">Sign up with Google</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default RegisterForm;
