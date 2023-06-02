import { Field, ErrorMessage, useField } from "formik";

import "../CheckoutForm.scss";

type Props = {
  name: string;
  onBlur: (object: { [key: string]: string }) => void;
};

function FormTextArea({ name, onBlur }: Props) {
  const [field, meta] = useField(name);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    if (!meta.error) {
      onBlur({ [name]: field.value });
    }
  };

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

export default FormTextArea;
