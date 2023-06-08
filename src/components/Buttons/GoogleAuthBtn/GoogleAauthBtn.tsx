import "./GoogleAauthBtn.scss";
import GoogleIcon from "@components/Icons/GoogleIcon";

type Props = {
  onClick: () => void;
};

function GoogleAauthBtn({ onClick }: Props) {
  return (
    <button
      className="google-auth-btn"
      onClick={onClick}
    >
      <span className="google-auth-btn__icon">
        <GoogleIcon />
      </span>
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleAauthBtn;
