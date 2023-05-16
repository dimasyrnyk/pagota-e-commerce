import "./CustomCheckbox.scss";
import CheckBoxIcon from "@components/Icons/CheckboxIcon";
import CheckboxCheckedIcon from "@components/Icons/CheckboxCheckedIcon";

type Props = {
  checked: boolean;
  onChange: () => void;
  label: string | JSX.Element;
};

function CustomCheckbox({ checked, onChange, label }: Props) {
  const handleChange = () => {
    onChange();
  };

  return (
    <li className="custom-checkbox__container">
      <input
        type="checkbox"
        checked={checked}
        className="custom-checkbox"
        onChange={handleChange}
      />
      {!checked ? (
        <CheckBoxIcon className="custom-checkbox__icon" />
      ) : (
        <CheckboxCheckedIcon className="custom-checkbox__icon" />
      )}
      <label
        htmlFor="custom-checkbox"
        onClick={handleChange}
      >
        {label}
      </label>
    </li>
  );
}

export default CustomCheckbox;
