import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/CustomInput";
import { createContributorAccount } from "../../redux/slices/authSlice";
import { ICreateContributor } from "../../types/user.type";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name"),
  lastName: Yup.string().required("Enter your last name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
});

const CreateContributor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInformation = { ...data };

    try {
      await dispatch(
        createContributorAccount(userInformation as ICreateContributor)
      );
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative bg-white/70 my-32 p-8 rounded shadow-2xl w-[420px] z-20">
      <h1 className="text-2xl font-semibold mb-6">
        Create Contributor Account
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

export default CreateContributor;
