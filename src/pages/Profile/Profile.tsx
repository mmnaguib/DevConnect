import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return (
    <div>
      <h2>Profile Page</h2>
      <Button
        type="default"
        icon="edit"
        text="Edit Profile"
        onClick={() => navigate("/editProfile")}
      />
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}
