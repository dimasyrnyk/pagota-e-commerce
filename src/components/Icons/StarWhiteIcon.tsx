import starWhiteIcon from "@assets/icons/starWhiteIcon.svg";

type Props = {
  className?: string;
};

function StarWhiteIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={starWhiteIcon}
      alt="Star white icon"
    />
  );
}

export default StarWhiteIcon;
