import { Field, ErrorMessage } from "formik";

import "./../BillingForm.scss";

type Props = {
  name: string;
  title: string;
  placeholder?: string;
  type?: string;
};

function FormInput({ name, title, placeholder, type = "text" }: Props) {
  return (
    <div className="form-input__container">
      <label
        className="form-input__label"
        htmlFor={name}
      >
        {title}
        <span className="text_red">*</span>
      </label>
      <Field
        className="form-input__body"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder || title}
        autoComplete="off"
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
