import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppDispatch, RootState } from "./store/store";
import { loadUserFromStorage, refreshAuthToken } from "./store/authSlice";
import LoadingScreen from "./component/Loading";
import RedirectIfAuth from "./component/RedirectIfAuth";
import LoginPage from "./pages/Auth/Login/Login";
import ProfilePage from "./pages/Profile/Profile";
import RegisterPage from "./pages/Auth/Register/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import Layout from "./component/Layout";
import LandingPage from "./pages/Home/LandingPage";
import FeedPage from "./pages/Home/FeedPage";
import { useTranslation } from "react-i18next";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { initialized, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  const { i18n } = useTranslation();
  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(() => {
        dispatch(refreshAuthToken(refreshToken));
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshToken, dispatch]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectIfAuth>
                <LandingPage />
              </RedirectIfAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuth>
                <LoginPage />
              </RedirectIfAuth>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuth>
                <RegisterPage />
              </RedirectIfAuth>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
