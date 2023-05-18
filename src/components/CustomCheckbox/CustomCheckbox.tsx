import "./CustomCheckbox.scss";
import CheckBoxIcon from "@components/Icons/CheckboxIcon";
import CheckboxCheckedIcon from "@components/Icons/CheckboxCheckedIcon";

type Props = {
  checked: boolean;
  onChange: () => void;
  label: string | JSX.Element;
};

function CustomCheckbox({ checked, onChange, label }: Props) {
  return (
    <li
      className="custom-checkbox__container"
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={checked}
        className="custom-checkbox"
        onChange={onChange}
      />
      {!checked ? (
        <CheckBoxIcon className="custom-checkbox__icon" />
      ) : (
        <CheckboxCheckedIcon className="custom-checkbox__icon" />
      )}
      <label htmlFor="custom-checkbox">{label}</label>
    </li>
  );
}

export default CustomCheckbox;
