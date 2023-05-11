import chevronDownIcon from "@assets/icons/chevronDownIcon.svg";

type Props = {
  className?: string;
};

function ChevronDownIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={chevronDownIcon}
      alt="Chevron down icon"
    />
  );
}

export default ChevronDownIcon;
