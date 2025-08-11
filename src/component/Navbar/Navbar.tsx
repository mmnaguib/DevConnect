import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };
  return (
    <div className="navbar">
      <div>
        <button onClick={toggleLanguage}>
          {i18n.language === "ar" ? "English" : "عربي"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
