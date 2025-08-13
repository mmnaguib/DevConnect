import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button, Popup } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser } from "../../interface";
import UserApi from "../../Api/UserApi";

export default function ProfilePage() {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [contactInfoPopup, setContactInfoPopup] = useState(false);
  const getProfileData = async () => {
    const res = await UserApi.getUserData(accessToken!);
    setProfileData(res.data);
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="coverImage"></div>
        <div className="userImage">
          <img
            src={`http://localhost:8000${profileData?.avatarUrl}`}
            width={"100%"}
            height={"100%"}
          />
        </div>
        <Button
          type="outlined"
          icon="edit"
          onClick={() =>
            navigate("/editProfile", { state: { profileData, accessToken } })
          }
          className="editProfileBtn"
        />
      </div>

      <div className="userData">
        <div>
          <h4>{profileData?.firstName + " " + profileData?.lastName}</h4>
          <span>{profileData?.headline}</span>
          <br />
          <span>
            {profileData?.company}
            {" ==> "}
            {profileData?.location}
          </span>
          <br />
          <span>{profileData?.connectionsCount} connections</span> <br />
          <span onClick={() => setContactInfoPopup(true)}>contact info</span>
          <br />
          {profileData?.bio}
        </div>
      </div>
      <Popup
        visible={contactInfoPopup}
        height={300}
        width={300}
        onHiding={() => setContactInfoPopup(false)}
      >
        phone: {profileData?.phone}
        {profileData?.website ? (
          <div>website: {profileData.website}</div>
        ) : null}
        {profileData?.linkedin ? (
          <div>linkedin: {profileData.linkedin}</div>
        ) : null}
        {profileData?.github ? <div>github: {profileData.github}</div> : null}
      </Popup>
    </>
  );
}
