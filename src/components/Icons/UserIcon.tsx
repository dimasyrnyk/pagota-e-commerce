import userIcon from "@assets/icons/userIcon.svg";

type Props = {
  className?: string;
  onClick?: () => void;
};

function UserIcon({ className = "", onClick }: Props) {
  return (
    <img
      className={className}
      src={userIcon}
      alt="User icon"
      onClick={onClick}
    />
  );
}

export default UserIcon;
