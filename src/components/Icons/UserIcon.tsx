import userIcon from "@assets/icons/userIcon.svg";

type Props = {
  className?: string;
};

function UserIcon({ className }: Props) {
  return (
    <div className={className}>
      <img src={userIcon} />
    </div>
  );
}

export default UserIcon;
