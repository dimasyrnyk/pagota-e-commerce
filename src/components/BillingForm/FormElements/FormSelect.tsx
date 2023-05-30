import { useField } from "formik";
import Select from "react-select";

import "./../BillingForm.scss";
import { ISelectOption } from "@constants/app";

type Props = {
  name: string;
  title: string;
  options: ISelectOption[];
  disabled?: boolean;
  placeholder?: string;
};

function FormSelect({ name, title, options, disabled, placeholder }: Props) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption.value);
  };

  const selectedOption =
    options.find((option) => option.value === field.value) || null;

  return (
    <div className="form-input__container">
      <label
        className="form-input__label"
        htmlFor={name}
      >
        {title}
        <span className="text_red">*</span>
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
      />
      {meta.touched && meta.error && (
        <div className="form-input__error">{meta.error}</div>
      )}
    </div>
  );
}

export default FormSelect;
