import checkBoxIcon from "@assets/icons/checkBoxIcon.svg";

type Props = {
  className?: string;
};

function CheckBoxIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={checkBoxIcon}
      alt="Checkbox icon"
    />
  );
}

export default CheckBoxIcon;
