import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PATHS } from "../../../constants/path";
import { Navigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { changePassword, clearMessage } from "../../../redux/slices/authSlice";
import { IChangePassword } from "../../../types/user.type";
import Input from "../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import authUtils from "../../../utils/auth";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your email"),
  newPassword: Yup.string()
    .required("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character"
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref(" newPassword")], "Passwords do not match"),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(resetPasswordSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isChangePassword, message, isError } = useSelector(
    (state: RootState) => state.auth
  );

  // Get email and token form session storage
  const email = authUtils.getEmail();
  const changeInitialPasswordToken = authUtils.getTempToken();

  //Submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form submitted!");

    const userInformation = {
      ...data,
      changeInitialPasswordToken: changeInitialPasswordToken,
    };

    console.log(userInformation);

    try {
      await dispatch(changePassword(userInformation as IChangePassword));
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);

  return (
    <>
      {isChangePassword && (
        <Navigate
          to={{
            pathname: `/${PATHS.AUTH.IDENTITY}`,
          }}
          replace
        />
      )}
      <div>
        <h1 className="text-2xl font-semibold mb-6">Change Initial Password</h1>
        <div className="bg-stone-200 px-2">
          <p className="mb-3 text-lg font-normal text-slate-600">
            You have logged in into the system in the first time, please provide
            a new password
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="email"
            type="text"
            value={email ?? ""}
            placeholder="trung@gmail.com"
            {...register("email")}
            hidden
            autoComplete="username"
          />

          <Input
            register={register}
            errors={errors}
            required
            id="newPassword"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Input
            register={register}
            errors={errors}
            required
            id="confirmNewPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:opacity-[0.97] text-white p-2 rounded w-full"
          >
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
