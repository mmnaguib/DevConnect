import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/authSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { Button, TextBox, TextArea } from "devextreme-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import notify from "devextreme/ui/notify";

const egyptGovernorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحيرة",
  "الشرقية",
  "المنوفية",
  "القليوبية",
  "كفر الشيخ",
  "الغربية",
  "الفيوم",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

const jobTypes = ["دوام كامل", "دوام جزئي", "عمل حر", "تدريب", "عن بُعد"];

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    headline: "",
    bio: "",
    skills: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    company: "",
    jobType: "",
    education: "",
    address: "",
    phone: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.email.trim()) stepErrors.email = "Email is required";
    if (!formData.password.trim()) stepErrors.password = "Password is required";
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    // Step 3 → إرسال البيانات
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (avatarFile) {
      formDataToSend.append("avatar", avatarFile);
    }

    const resultAction = await dispatch(register(formDataToSend));
    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
      toast.success("Successfully Registered, Now Login");
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
        {/* Step 1 */}
        {step === 1 && (
          <>
            <div
              className={`inputContainer ${
                formData.email || errors.email ? "hasValue" : ""
              }`}
            >
              <label>Email</label>
              <TextBox
                value={formData.email}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("email", e.value)}
                className={errors.email ? "errorInput" : ""}
                mode="email"
              />
              {errors.email && <div className="errorMsg">{errors.email}</div>}
            </div>
            <br />

            <div
              className={`inputContainer ${
                formData.password || errors.password ? "hasValue" : ""
              }`}
            >
              <label>Password</label>
              <TextBox
                value={formData.password}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("password", e.value)}
                className={errors.password ? "errorInput" : ""}
                mode="password"
              />
              {errors.password && (
                <div className="errorMsg">{errors.password}</div>
              )}
            </div>
            <br />

            <Button type="default" useSubmitBehavior height={52}>
              Next
            </Button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                className={`inputContainer ${
                  formData.firstName ? "hasValue" : ""
                }`}
              >
                <label>First Name</label>
                <TextBox
                  value={formData.firstName}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("firstName", e.value)}
                />
              </div>

              <div
                className={`inputContainer ${
                  formData.lastName ? "hasValue" : ""
                }`}
              >
                <label>Last Name</label>
                <TextBox
                  value={formData.lastName}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("lastName", e.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div
                className={`inputContainer ${formData.name ? "hasValue" : ""}`}
              >
                <label>Username</label>
                <TextBox
                  value={formData.name}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("name", e.value)}
                />
              </div>
              <div
                className={`inputContainer ${
                  formData.headline ? "hasValue" : ""
                }`}
              >
                <label>Headline</label>
                <TextBox
                  value={formData.headline}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("headline", e.value)}
                />
              </div>
            </div>

            <div className={`inputContainer ${formData.bio ? "hasValue" : ""}`}>
              <label>Bio</label>
              <TextArea
                value={formData.bio}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("bio", e.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div
                className={`inputContainer ${
                  formData.skills ? "hasValue" : ""
                }`}
              >
                <label>Skills (comma separated)</label>
                <TextBox
                  value={formData.skills}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("skills", e.value)}
                />
              </div>

              <div
                className={`inputContainer ${
                  formData.website ? "hasValue" : ""
                }`}
              >
                <label>Website</label>
                <TextBox
                  value={formData.website}
                  valueChangeEvent="input"
                  onValueChanged={(e) => handleChange("website", e.value)}
                />
              </div>
            </div>

            <div
              className={`inputContainer ${formData.github ? "hasValue" : ""}`}
            >
              <label>GitHub</label>
              <TextBox
                value={formData.github}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("github", e.value)}
              />
            </div>

            <div
              className={`inputContainer ${
                formData.linkedin ? "hasValue" : ""
              }`}
            >
              <label>LinkedIn</label>
              <TextBox
                value={formData.linkedin}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("linkedin", e.value)}
              />
            </div>

            <div className={`inputContainer ${avatarFile ? "hasValue" : ""}`}>
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
            </div>

            <Button
              type="default"
              disabled={loading}
              useSubmitBehavior
              height={52}
            >
              Next
            </Button>
            <br />
            <Button type="normal" onClick={() => setStep(1)}>
              Back
            </Button>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div
              className={`inputContainer ${
                formData.education ? "hasValue" : ""
              }`}
            >
              <label>Education</label>
              <TextBox
                value={formData.education}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("education", e.value)}
              />
            </div>

            <div
              className={`inputContainer ${formData.phone ? "hasValue" : ""}`}
            >
              <label>Phone</label>
              <TextBox
                value={formData.phone}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("phone", e.value)}
                mode="tel"
              />
            </div>

            <div
              className={`inputContainer ${formData.company ? "hasValue" : ""}`}
            >
              <label>Company</label>
              <TextBox
                value={formData.company}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("company", e.value)}
              />
            </div>

            <div
              className={`inputContainer ${
                formData.birthDate ? "hasValue" : ""
              }`}
            >
              <label>Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
              />
            </div>

            <div
              className={`inputContainer ${formData.address ? "hasValue" : ""}`}
            >
              <label>Address</label>
              <TextBox
                value={formData.address}
                valueChangeEvent="input"
                onValueChanged={(e) => handleChange("address", e.value)}
              />
            </div>

            <div
              className={`inputContainer ${formData.jobType ? "hasValue" : ""}`}
            >
              <label>Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => handleChange("jobType", e.target.value)}
              >
                <option value="">Select Job Type</option>
                {jobTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`inputContainer ${
                formData.location ? "hasValue" : ""
              }`}
            >
              <label>Governorate</label>
              <select
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              >
                <option value="">Select Governorate</option>
                {egyptGovernorates.map((gov, idx) => (
                  <option key={idx} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="default"
              disabled={loading}
              useSubmitBehavior
              height={52}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            <br />
            <Button type="normal" onClick={() => setStep(2)}>
              Back
            </Button>
          </>
        )}
      </form>

      {step === 1 && (
        <>
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
        </>
      )}
    </div>
  );
}
