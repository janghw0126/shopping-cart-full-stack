import "./ErrorMessage.css";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}
