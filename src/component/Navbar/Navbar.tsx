import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "devextreme-react/button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="navbar">
      <div style={{ display: "flex" }}>
        <i className="fa-brands fa-linkedin fa-2x"></i>
        <ul className="navLinks">
          <li>
            <Link to="/feed">
              <i className="fa-solid fa-home"></i>
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <i className="fa-solid fa-chat"></i>
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ position: "relative" }}>
        <i
          className="fa-solid fa-user"
          onClick={() => setIsOpen((prev) => !prev)}
        ></i>
        {isOpen && (
          <div
            className="userDropdown"
            ref={dropdownRef}
            style={
              i18n.language === "ar"
                ? { right: "unset", left: 0 }
                : { left: "unset", right: 0 }
            }
          >
            <Link
              onClick={() => setIsOpen((prev) => !prev)}
              to="profile"
              className="userDropdownBtn"
            >
              Profile
            </Link>
            <Button type="default" onClick={toggleLanguage}>
              {i18n.language === "ar" ? "English" : "عربي"}
            </Button>
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
