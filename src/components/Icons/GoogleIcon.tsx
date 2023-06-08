import googleLogoIcon from "@assets/icons/googleLogoIcon.svg";

type Props = {
  className?: string;
};

function GoogleIcon({ className = "" }: Props) {
  return (
    <img
      className={className}
      src={googleLogoIcon}
      alt="Google logo icon"
    />
  );
}

export default GoogleIcon;
