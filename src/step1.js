import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import Form from "./components/Form";
import MainContainer from "./components/mainContainer";
import Input from "./components/input";
import PrimaryButton from "./components/primaryButton";
import Typography from "@material-ui/core/Typography";
import { useData } from "./dataContext";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is required"),
});

export const Step1 = () => {
  const { setValues, data } = useData();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/step2");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        <span>🦄 Step 1</span>
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          //   {...register("firstName")}
          ref={register}
          name="firstName"
          type="text"
          label="First Name"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          ref={register}
          //   {...register("lastName")}
          name="lastName"
          type="text"
          label="Last Name"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
