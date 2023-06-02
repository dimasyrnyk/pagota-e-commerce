import { useField } from "formik";
import Select, { SingleValue } from "react-select";

import "../CheckoutForm.scss";
import { ISelectOption } from "@constants/cart";

type Props = {
  name: string;
  title: string;
  options: ISelectOption[];
  onBlur: (object: { [key: string]: string }) => void;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
};

function FormSelect({
  name,
  title,
  options,
  onBlur,
  disabled,
  isRequired = false,
  placeholder,
}: Props) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: SingleValue<ISelectOption>) => {
    if (selectedOption) {
      helpers.setValue(selectedOption.value);
    }
  };

  const selectedOption =
    options.find((option) => option.value === field.value) || null;

  const handleBlur = () => {
    field.onBlur({ target: { name } });
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
        {title}
        {isRequired ? <span className="text_red">*</span> : null}
      </label>
      <Select
        className="form-select__container"
        classNamePrefix="form-select"
        id={name}
        name={name}
        value={selectedOption}
        options={options}
        onChange={handleChange}
        isDisabled={disabled}
        placeholder={placeholder || title}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error && (
        <div className="form-input__error">{meta.error}</div>
      )}
    </div>
  );
}

export default FormSelect;
