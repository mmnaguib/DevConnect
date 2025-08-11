import "devextreme/dist/css/dx.light.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home/Home";
function App() {
  const { i18n } = useTranslation();
  return (
    <div className="App" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
