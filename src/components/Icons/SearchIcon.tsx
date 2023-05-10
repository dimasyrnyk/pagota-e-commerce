import searchIcon from "@assets/icons/searchIcon.svg";

type Props = {
  className?: string;
};

function SearchIcon({ className }: Props) {
  return (
    <div className={className}>
      <img src={searchIcon} />
    </div>
  );
}

export default SearchIcon;
