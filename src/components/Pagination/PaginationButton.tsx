import "./Pagination.scss";

type Props = {
  title: string;
  disabled: boolean;
  onClick: () => void;
};

function PaginationButton({ title, disabled, onClick }: Props) {
  if (disabled) {
    return null;
  }

  return (
    <li>
      <button
        className="paginate__button"
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </li>
  );
}

export default PaginationButton;
