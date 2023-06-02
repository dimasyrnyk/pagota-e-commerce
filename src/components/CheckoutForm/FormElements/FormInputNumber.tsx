import React from "react";
import { ErrorMessage, Field, useField } from "formik";

import "../CheckoutForm.scss";

type Props = {
  name: string;
  label: string;
  regex: RegExp;
  onBlur: (object: { [key: string]: string }) => void;
  placeholder?: string;
};

function FormInputNumber({ name, label, regex, onBlur, placeholder }: Props) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true);

    const newValue = e.target.value;

    if (regex.test(newValue) || !newValue) {
      helpers.setValue(newValue);
    }
  };

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
        id={name}
        type="text"
        name={name}
        value={field.value}
        placeholder={placeholder || label}
        autoComplete="off"
        onChange={handleChange}
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

export default FormInputNumber;
