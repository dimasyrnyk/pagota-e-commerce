import chevronDownIcon from "@assets/icons/chevronDownIcon.svg";

type Props = {
  className?: string;
  onClick?: () => void;
};

function ChevronDownIcon({ className, onClick }: Props) {
  return (
    <img
      className={className}
      src={chevronDownIcon}
      alt="Chevron down icon"
      onClick={onClick}
    />
  );
}

export default ChevronDownIcon;
