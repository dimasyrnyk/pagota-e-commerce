import { ErrorMessage, Field, useField } from "formik";

import "../CheckoutForm.scss";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  label: string;
  regex: RegExp;
  onBlur: () => void;
  placeholder?: string;
  type?: string;
};

function FormInputNumber({
  name,
  label,
  regex,
  onBlur,
  placeholder,
  type,
}: Props) {
  const [field, meta, helpers] = useField(name);
  const [inputValue, setInputValue] = useState<string>(field.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    if (regex.test(newValue) || !newValue) {
      setInputValue(newValue);
    }
    helpers.setTouched(true);
  };

  useEffect(() => {
    helpers.setValue(inputValue);
  }, [inputValue]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    onBlur();
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
      <input
        className="form-input__body"
        id={name}
        type={type}
        name={name}
        value={field.value}
        placeholder={placeholder || label}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]*"
      />
      <ErrorMessage
        className="form-input__error"
        name={name}
        component="div"
      />
      {/* {error ? <div className="form-input__error">{error}</div> : null} */}
    </div>
  );
}

export default FormInputNumber;
