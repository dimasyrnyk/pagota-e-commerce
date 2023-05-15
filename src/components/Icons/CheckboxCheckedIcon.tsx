import checkBoxCheckedIcon from "@assets/icons/checkBoxCheckedIcon.svg";

type Props = {
  className?: string;
};

function CheckboxCheckedIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={checkBoxCheckedIcon}
      alt="Checkbox checked icon"
    />
  );
}

export default CheckboxCheckedIcon;
