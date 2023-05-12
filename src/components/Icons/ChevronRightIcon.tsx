import chevronRightIcon from "@assets/icons/chevronRightIcon.svg";

type Props = {
  className?: string;
};

function ChevronRightIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={chevronRightIcon}
      alt="Chevron right icon"
    />
  );
}

export default ChevronRightIcon;
