import { Typography } from "@material-ui/core";
import React from "react";
import Form from "./components/Form";
import MainContainer from "./components/mainContainer";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useData } from "./dataContext";
import PrimaryButton from "./components/primaryButton";
import { FileInput } from "./components/fileInput";

const Step3 = () => {
  const history = useHistory();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });
  const onSubmit = (data) => {
    history.push("/result");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        <span>🦄 Step 3</span>
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control}></FileInput>
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step3;
