import React from "react";
import Typography from "@material-ui/core/Typography";
import Form from "./components/Form";
import Input from "./components/input";
import MainContainer from "./components/mainContainer";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useData } from "./dataContext";
import PrimaryButton from "./components/primaryButton";
import parsePhoneNumberFromString from "libphonenumber-js";

const normalizePhoneMunber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have a correct fromat")
    .required("Email is required"),
});

const Step2 = () => {
  const { data, setValues } = useData();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography>
        <span>🦄 Step 2</span>
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              inputRef={register}
              name="hasPhone"
            />
          }
          label="Do you have a phone"
        />
        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneMunber(event.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
