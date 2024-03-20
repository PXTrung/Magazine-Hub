import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../authValidationSchemas";
import Input from "../../../components/CustomInput";
import { ENDPOINTS } from "../../../api";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(JSON.stringify(data));
    const payload = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("jwtToken", response.data);
        const decodedToken = jwtDecode(response.data);
        console.log(decodedToken);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
