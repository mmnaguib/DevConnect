import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextBox,
  TextArea,
  SelectBox,
  DateBox,
  Button,
} from "devextreme-react";
import { toast } from "react-toastify";
import UserApi from "../../Api/UserApi";

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحيرة",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "الفيوم",
  "كفر الشيخ",
  "أسيوط",
  "المنيا",
  "قنا",
  "سوهاج",
  "الأقصر",
  "أسوان",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "دمياط",
  "بني سويف",
  "شمال سيناء",
  "جنوب سيناء",
  "مطروح",
  "البحر الأحمر",
  "الوادي الجديد",
];

const jobTypes = [
  { id: "full_time", name: "دوام كامل" },
  { id: "part_time", name: "دوام جزئي" },
  { id: "freelance", name: "عمل حر" },
  { id: "internship", name: "تدريب" },
];

export default function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData, accessToken } = location.state || {};

  const [formData, setFormData] = useState({
    ...profileData,
    skills: profileData?.skills?.join(", ") || "", // نحول array لـ string علشان نعرضها
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // skills تتحول لـ array قبل الإرسال
    const dataToSend = {
      ...formData,
      skills: formData.skills
        ? formData.skills.split(",").map((s: string) => s.trim())
        : [],
    };

    Object.entries(dataToSend).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => formDataToSend.append(key, v));
        } else {
          formDataToSend.append(key, value as string);
        }
      }
    });

    if (avatarFile) {
      formDataToSend.append("avatar", avatarFile);
    }

    try {
      const res = await UserApi.updateUserProfile(accessToken, formDataToSend);
      toast.success(res.data.message);
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="authForm" style={{ width: "600px" }}>
      <h2>تعديل البروفايل</h2>
      <form
        onSubmit={handleSubmit}
        className="editUserForm"
        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
      >
        <TextBox
          value={formData.firstName}
          onValueChanged={(e) => handleChange("firstName", e.value)}
          placeholder="الاسم الأول"
        />
        <TextBox
          value={formData.lastName}
          onValueChanged={(e) => handleChange("lastName", e.value)}
          placeholder="اسم العائلة"
        />
        <TextBox
          value={formData.name}
          onValueChanged={(e) => handleChange("name", e.value)}
          placeholder="اسم المستخدم"
        />
        <TextBox
          value={formData.headline}
          onValueChanged={(e) => handleChange("headline", e.value)}
          placeholder="عنوان مختصر"
        />
        <TextArea
          value={formData.bio}
          onValueChanged={(e) => handleChange("bio", e.value)}
          placeholder="نبذة عنك"
        />

        <TextBox
          value={formData.skills}
          onValueChanged={(e) => handleChange("skills", e.value)}
          placeholder="المهارات (مفصولة بفواصل)"
        />
        <TextBox
          value={formData.education}
          onValueChanged={(e) => handleChange("education", e.value)}
          placeholder="التعليم"
        />
        <TextBox
          value={formData.phone}
          onValueChanged={(e) => handleChange("phone", e.value)}
          placeholder="رقم الهاتف"
        />
        <TextBox
          value={formData.company}
          onValueChanged={(e) => handleChange("company", e.value)}
          placeholder="الشركة"
        />

        <DateBox
          value={formData.birthDate}
          onValueChanged={(e) => handleChange("birthDate", e.value)}
          placeholder="تاريخ الميلاد"
          displayFormat="dd/MM/yyyy"
        />
        <TextBox
          value={formData.address}
          onValueChanged={(e) => handleChange("address", e.value)}
          placeholder="العنوان"
        />

        <SelectBox
          dataSource={jobTypes}
          value={formData.jobType}
          onValueChanged={(e) => handleChange("jobType", e.value)}
          displayExpr="name"
          valueExpr="id"
          placeholder="نوع الوظيفة"
        />
        <SelectBox
          dataSource={governorates}
          value={formData.location}
          onValueChanged={(e) => handleChange("location", e.value)}
          placeholder="المحافظة"
        />

        {/* الحقول الجديدة */}
        <TextBox
          value={formData.website}
          onValueChanged={(e) => handleChange("website", e.value)}
          placeholder="الموقع الإلكتروني"
        />
        <TextBox
          value={formData.github}
          onValueChanged={(e) => handleChange("github", e.value)}
          placeholder="رابط GitHub"
        />
        <TextBox
          value={formData.linkedin}
          onValueChanged={(e) => handleChange("linkedin", e.value)}
          placeholder="رابط LinkedIn"
        />

        <div>
          <label>الصورة الشخصية:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          />
        </div>

        <Button type="default" useSubmitBehavior text="حفظ التعديلات" />
      </form>
    </div>
  );
}
