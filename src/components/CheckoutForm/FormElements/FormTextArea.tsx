import { Field, ErrorMessage } from "formik";

import "../CheckoutForm.scss";

type Props = {
  name: string;
};

function FormTextArea({ name }: Props) {
  return (
    <div className="form-text-area__container">
      <label
        className="form-input__label"
        htmlFor={name}
      >
        Order notes
      </label>
      <Field
        className="form-input__body"
        as="textarea"
        id={name}
        name={name}
        placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
        rows="4"
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

export default FormTextArea;
