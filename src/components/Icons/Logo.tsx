import logo from "@assets/icons/logo.svg";

type Props = {
  className?: string;
};

function Logo({ className }: Props) {
  return (
    <img
      className={className}
      src={logo}
      alt="Logo Freshnesecom"
    />
  );
}

export default Logo;
