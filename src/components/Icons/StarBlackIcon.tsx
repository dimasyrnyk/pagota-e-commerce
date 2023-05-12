import starBlackIcon from "@assets/icons/starBlackIcon.svg";

type Props = {
  className?: string;
};

function StarBlackIcon({ className }: Props) {
  return (
    <img
      className={className}
      src={starBlackIcon}
      alt="Star black icon"
    />
  );
}

export default StarBlackIcon;
