import chevronDownIcon from "@assets/icons/chevronDownIcon.svg";

type Props = {
  className?: string;
};

function ChevronDownIcon({ className }: Props) {
  return (
    <div className={className}>
      <img
        src={chevronDownIcon}
        alt="Chevron down icon"
      />
    </div>
  );
}

export default ChevronDownIcon;
