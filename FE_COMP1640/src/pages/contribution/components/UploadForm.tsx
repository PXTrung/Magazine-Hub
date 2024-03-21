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

<<<<<<< HEAD
interface FormData {
  title: string;
  description: string;
  imageFile: FileList;
  documentFile: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  imageFile: yup
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
=======
const schema = yup.object().shape({
   Title: yup.string().required("Title is required"),
   Description: yup.string().required("Description is required"),
   ImageFile: yup
      .mixed<FileList>()
      .test("require", "Upload your image", (files) => {
         return !!files?.[0];
      })
      .test("fileType", "Unsupported file format", (files) => {
         return (
            !files ||
            files?.[0]?.type === "image/jpeg" ||
            files?.[0]?.type === "image/png"
         );
      })
      .test("fileSize", "File size is too large", (files) => {
         return !files || files?.[0]?.size < 5000000;
      }),
   DocumentFile: yup
      .mixed<File>()
      .test("require", "Upload your document", (file) => {
         return !!file;
      }),
>>>>>>> 40ede900c350b80c321bfcd3a4508b294fcf8f84
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

<<<<<<< HEAD
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("imageFile", data.imageFile[0]);
    formData.append("documentFile", data.documentFile[0]);

    console.log(data);
    await fetch(ENDPOINTS.CONTRIBUTION, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
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
          id="imageFile"
          label="imageFile"
          type="file"
          accept="image/*"
        ></Input>
        <Input
          register={register}
          errors={errors}
          required
          id="documentFile"
          label="documentFile"
          type="file"
          accept=".docx, .doc"
        ></Input>
=======
   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const formData = new FormData();

      formData.append("imageFile", data?.ImageFile[0]);
      formData.append("title", data?.Title);
      formData.append("description", data?.Title);
      formData.append("documentFile", data?.DocumentFile[0]);

      await fetch(ENDPOINTS.CONTRIBUTION, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
         body: formData,
      })
         .then((response) => {
            if (response.status === 200) {
               alert("upload successfully");
            }
         })
         .catch((error) => {
            alert("Lỗi:" + error);
            console.error("Lỗi:", error);
         });
   };
>>>>>>> 40ede900c350b80c321bfcd3a4508b294fcf8f84

   return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-semibold mb-4">Contribution Upload</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Input
               register={register}
               errors={errors}
               required
               id="Title"
               label="Title"
               type="text"
            ></Input>
            <Input
               register={register}
               errors={errors}
               required
               id="Description"
               label="Description"
               type="text"
            ></Input>
            <Input
               register={register}
               errors={errors}
               required
               id="ImageFile"
               label="Image"
               type="file"
               accept="image/*"
            ></Input>
            <Input
               register={register}
               errors={errors}
               required
               id="DocumentFile"
               label="Document"
               type="file"
               accept=".docx, .doc, .pdf"
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
