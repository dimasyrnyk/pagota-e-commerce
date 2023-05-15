import "./CustomCheckbox.scss";
import { useState } from "react";
import CheckBoxIcon from "@components/Icons/CheckboxIcon";
import CheckboxCheckedIcon from "@components/Icons/CheckboxCheckedIcon";

type Props = {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  label: string | JSX.Element;
};

function CustomCheckbox({ isChecked, onChange, label }: Props) {
  const [checked, setChecked] = useState(isChecked);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target ? e.target.checked : !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <li className="custom-checkbox__container">
      <input
        type="checkbox"
        checked={checked}
        className="custom-checkbox"
        onChange={handleOnChange}
      />
      {!checked ? (
        <CheckBoxIcon className="custom-checkbox__icon" />
      ) : (
        <CheckboxCheckedIcon className="custom-checkbox__icon" />
      )}
      <label
        htmlFor="custom-checkbox"
        onClick={() => setChecked(!checked)}
      >
        {label}
      </label>
    </li>
  );
}

export default CustomCheckbox;
