import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
