import "./ErrorFallback.scss";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div className="error-boundary">
      <h2>Error</h2>
      <p>{error.message}</p>
      <PrimaryBtn onClick={resetErrorBoundary}>Try again</PrimaryBtn>
    </div>
  );
}

export default ErrorFallback;
