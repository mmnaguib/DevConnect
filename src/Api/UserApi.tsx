import { useSelector } from "react-redux";
import { IUser } from "../interface";
import axiosInstance from "./axiosInstance";
import { RootState } from "../store/store";

const UserApi = {
  getUserData: async (accessToken: string) => {
    return await axiosInstance.get("auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  updateUserProfile: async (accessToken: string, updates: FormData) => {
    try {
      const res = await axiosInstance.put("auth/update", updates, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res;
    } catch (error: any) {
      console.error(
        "Failed to update user profile:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default UserApi;
