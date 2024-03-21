import React from "react";
import Input from "../../../components/CustomInput";
import * as yup from "yup";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ENDPOINTS } from "../../../constants/endpoint";

interface FormData {
  title: string;
  description: string;
  image: FileList;
  document: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed<FileList>()
    .test("require", "Upload your image", (files) => {
      console.log(files?.[0]);

      return !!files?.[0];
    })
    .test("fileType", "Unsupported file format", (files) => {
      console.log(files?.[0]?.type);

      return (
        !files ||
        files?.[0]?.type === "image/jpeg" ||
        files?.[0]?.type === "image/png"
      );
    })
    .test("fileSize", "File size is too large", (files) => {
      console.log(files?.[0]?.size);

      return !files || files?.[0]?.size < 5000000;
    }),
});

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const jwt = localStorage.getItem("jwtToken");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    await fetch(ENDPOINTS.CONTRIBUTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("status: ", response.json());
        if (response.status === 200) {
          alert("upload successfully");
        }
      })
      .catch((error) => {
        alert("Lỗi:" + error);
        console.error("Lỗi:", error);
      });
  };
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contribution Upload</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Input
          register={register}
          errors={errors}
          required
          id="title"
          label="title"
          type="text"
        ></Input>
        <Input
          register={register}
          errors={errors}
          required
          id="description"
          label="description"
          type="text"
        ></Input>
        <Input
          register={register}
          errors={errors}
          required
          id="image"
          label="image"
          type="file"
          accept="image/*"
        ></Input>
        <Input
          register={register}
          errors={errors}
          required
          id="document"
          label="document"
          type="file"
          accept=".docx, .doc"
        ></Input>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
