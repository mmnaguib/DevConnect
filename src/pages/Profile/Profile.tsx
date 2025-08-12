import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h2>Profile Page</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <p>Token: {accessToken}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
