import { useField } from "formik";

import "../CheckoutForm.scss";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (regex.test(newValue) || newValue === "") {
      helpers.setValue(newValue);
    }
    helpers.setTouched(true);
  };

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
      />

      {meta.touched && meta.error ? (
        <div className="form-input__error">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormInputNumber;
