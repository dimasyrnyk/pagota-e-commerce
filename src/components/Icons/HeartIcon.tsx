import heartIcon from "@assets/icons/heartIcon.svg";

type Props = {
  className?: string;
};

function HeartIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={heartIcon}
      alt="Heart icon"
    />
  );
}

export default HeartIcon;
