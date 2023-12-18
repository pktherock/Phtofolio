import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
      <p>{error.data}</p>
    </div>
  );
}

export default ErrorPage;
