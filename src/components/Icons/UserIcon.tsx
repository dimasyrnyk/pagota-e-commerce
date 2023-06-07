import { useSelector } from "react-redux";

import "./Icons.scss";
import { RootState } from "@store/index";
import userIcon from "@assets/icons/userIcon.svg";

type Props = {
  className?: string;
  onClick?: () => void;
};

function UserIcon({ className = "", onClick }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <img
      className={"user__icon " + className}
      src={user ? user.picture : userIcon}
      alt="User icon"
      onClick={onClick}
    />
  );
}

export default UserIcon;
