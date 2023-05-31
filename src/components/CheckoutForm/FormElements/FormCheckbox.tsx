import { Field, ErrorMessage } from "formik";

import "../CheckoutForm.scss";
import { PropsWithChildren } from "react";

type Props = {
  name: string;
  title?: string;
};

function FormCheckbox({ name, title, children }: PropsWithChildren<Props>) {
  return (
    <div className="form-checkbox__container">
      <Field
        className="form-input__body"
        type="checkbox"
        id={name}
        name={name}
      />
      <label
        htmlFor={name}
        className="form-checkbox__label"
      >
        {children}
        {title}
      </label>
      <ErrorMessage
        className="form-checkbox__error"
        name={name}
        component="div"
      />
    </div>
  );
}

export default FormCheckbox;
