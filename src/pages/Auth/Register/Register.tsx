import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/authSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { Button, TextBox } from "devextreme-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import notify from "devextreme/ui/notify";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
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

    const resultAction = await dispatch(register({ email, password }));
    console.log(resultAction);
    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
      toast.success("Successfully Register, Now Login");
    }
  };
  useEffect(() => {
    if (error) {
      notify(
        {
          message: error,
          width: "50%",
          position: {
            at: "center bottom",
            my: "center bottom",
            offset: { y: -20 },
          },
        },
        "error",
        3000
      );
    }
  }, [error]);
  return (
    <div className="authForm">
      <h2>Join Now !!</h2>
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
          {loading ? "Loading..." : "Agree & Join "}
        </Button>
      </form>

      <br />
      <span className="orBr">or</span>
      <br />
      <Button>
        <i className="fa-brands fa-google"></i> Continue with Google
      </Button>
      <Button>
        <i className="fa-brands fa-apple"></i> Continue with Apple
      </Button>
      <div className="registerBtnInLogin">
        Already on LinkedIn? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
