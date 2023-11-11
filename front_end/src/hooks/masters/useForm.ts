import { useState } from "react";

// useForm functional componen
export const useForm = (
  initialState?: any,
  validateOnChange?: boolean,
  validate: any = null,
  initialStateError?: any
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialStateError);

  // onChange
  const onChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors(initialStateError);
  };
  // return values
  return {
    onChange,
    values,
    errors,
    setErrors,
    resetForm,
    setValues,
  };
};
