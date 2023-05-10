import logo from "@assets/icons/logo.svg";

type Props = {
  className?: string;
};

function Logo({ className }: Props) {
  return (
    <div className={className}>
      <img
        src={logo}
        alt="Logo Freshnesecom"
      />
    </div>
  );
}

export default Logo;
