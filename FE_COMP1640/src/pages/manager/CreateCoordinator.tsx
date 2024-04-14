import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/CustomInput";
import { createCoordinatorAccount } from "../../redux/slices/authSlice";
import { ICreateCoordinator } from "../../types/user.type";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name"),
  lastName: Yup.string().required("Enter your last name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
});

const CreateCoordinator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faculty } = useSelector((state: RootState) => state.faculty);
  const { message } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(registerSchema),
  });

  const defaultValue: string | undefined =
    faculty.length > 0 ? faculty[0].id : undefined;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInformation = { ...data };

    try {
      await dispatch(
        createCoordinatorAccount(userInformation as ICreateCoordinator)
      );
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative bg-white/70 my-32 p-8 rounded shadow-2xl w-[420px] z-20">
      <h1 className="text-2xl font-semibold mb-6">
        Create Coordinator Account
      </h1>
      {message && <span className="text-green-600">{message}</span>}
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
            defaultValue={defaultValue}
            {...(register && register("facultyId", {}))}
          >
            {faculty?.map((falcuty: any) => {
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

        <button
          type="submit"
          className="bg-blue-600 hover:opacity-[0.97] text-white p-2 rounded w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCoordinator;
