import heartIconFull from "@assets/icons/heartIconFull.svg";

type Props = {
  className?: string;
};

function HeartIconFull({ className }: Props) {
  return (
    <img
      className={className}
      src={heartIconFull}
      alt="Heart icon"
    />
  );
}

export default HeartIconFull;
