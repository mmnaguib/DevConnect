import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type RedirectIfAuthProps = {
  children: ReactElement;
};

export default function RedirectIfAuth({ children }: RedirectIfAuthProps) {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <Navigate to="/feed" replace />;
  }

  return children;
}
