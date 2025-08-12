import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../interface";
import axiosInstance from "../Api/axiosInstance";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  initialized: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("auth/login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/register", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("auth/refresh-token", {
        refreshToken,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("auth");
    },
    loadUserFromStorage: (state) => {
      const saved = localStorage.getItem("auth");
      if (saved) {
        const parsed = JSON.parse(saved);
        state.user = parsed.user;
        state.accessToken = parsed.accessToken;
        state.refreshToken = parsed.refreshToken;
      }
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        // localStorage.setItem(
        //   "auth",
        //   JSON.stringify({
        //     user: state.user,
        //     token: state.accessToken,
        //     refreshToken: state.refreshToken,
        //   })
        // );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.accessToken,
            refreshToken: state.refreshToken,
          })
        );
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
