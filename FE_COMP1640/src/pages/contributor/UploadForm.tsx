import React from "react";
import Input from "../../components/CustomInput";
import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contribute } from "../../redux/slices/contributionSlice";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";

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
});

const UploadForm = () => {
  const { dispatch, appSelector } = useRedux();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const { isError, message, isLoading, detail } = appSelector(
    (state: RootState) => state.contribution
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    formData.append("imageFile", data?.ImageFile[0]);
    formData.append("title", data?.Title);
    formData.append("description", data?.Title);
    formData.append("documentFile", data?.DocumentFile[0]);
    formData.append("periodId", "754ae63b-a864-4968-8498-a7e204ee11fe");

    dispatch(contribute(formData));
  };

  return (
    <div className="w-2/3 h-fit mx-auto bg-white px-8 py-10 rounded-lg shadow-md mt-5">
      {message && <span className="text-green-400">{message}</span>}
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
        <div className="w-full flex justify-center mt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[280px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
