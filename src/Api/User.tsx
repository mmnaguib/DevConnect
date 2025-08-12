import { useSelector } from "react-redux";
import { IUser } from "../interface";
import axiosInstance from "./axiosInstance";
import { RootState } from "../store/store";

const { accessToken } = useSelector((state: RootState) => state.auth);

const UserData = {
  getUserData: async () => {
    return await axiosInstance.get("auth/me");
  },

  updateUserProfile: async (updates: IUser) => {
    try {
      const res = await axiosInstance.put("auth/profile", updates, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data.user;
    } catch (error: any) {
      console.error(
        "Failed to update user profile:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default UserData;
