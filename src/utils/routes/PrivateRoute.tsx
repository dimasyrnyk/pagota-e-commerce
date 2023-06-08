import { PropsWithChildren } from "react";
import { Route, Navigate } from "react-router-dom";

interface Props {
  isAuth: boolean;
}

const PrivateRoute = ({ isAuth, children }: PropsWithChildren<Props>) => {
  if (!isAuth) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
