import React from "react";
import { Field, ErrorMessage, useField } from "formik";

import "../CheckoutForm.scss";

type Props = {
  name: string;
  label: string;
  onBlur: (object: { [key: string]: string }) => void;
  placeholder?: string;
  type?: string;
};

function FormInput({ name, label, onBlur, placeholder, type = "text" }: Props) {
  const [field, meta] = useField(name);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    if (!meta.error) {
      onBlur({ [name]: field.value });
    }
  };

  return (
    <div className="form-input__container">
      <label
        className="form-input__label"
        htmlFor={name}
      >
        {label}
        <span className="text_red">*</span>
      </label>
      <Field
        className="form-input__body"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || label}
        autoComplete="off"
        onBlur={handleBlur}
      />
      <ErrorMessage
        className="form-input__error"
        name={name}
        component="div"
      />
    </div>
  );
}

export default FormInput;
