import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/authSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { Button, TextBox } from "devextreme-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!password.trim()) {
      setErrors({ password: "Password is required" });
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <div className="authForm">
      <h2>Sign in</h2>

      <Button>
        <i className="fa-brands fa-google"></i> Continue with Google
      </Button>
      <Button>
        <i className="fa-brands fa-apple"></i> Continue with Apple
      </Button>
      <br />
      <span className="orBr">or</span>
      <br />
      <form onSubmit={handleSubmit}>
        <div
          className={`inputContainer ${
            email || errors.email ? "hasValue" : ""
          }`}
        >
          <label>Email</label>
          <TextBox
            value={email}
            valueChangeEvent="input"
            onValueChanged={(e) => {
              setEmail(e.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            className={errors.email ? "errorInput" : ""}
            mode="email"
          />
          {errors.email && <div className="errorMsg">{errors.email}</div>}
        </div>

        <br />
        <div
          className={`inputContainer ${
            password || errors.password ? "hasValue" : ""
          }`}
        >
          <label>Password</label>

          <TextBox
            value={password}
            valueChangeEvent="input"
            onValueChanged={(e) => {
              setPassword(e.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            className={errors.password ? "errorInput" : ""}
            mode="password"
          />
          {errors.password && <div className="errorMsg">{errors.password}</div>}
        </div>
        <br />
        <Button type="default" disabled={loading} useSubmitBehavior height={52}>
          {loading ? "Loading..." : "Sign In"}
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="registerBtnInLogin">
        New to LinkedIn? <Link to="/register">Join now</Link>
      </div>
    </div>
  );
}
