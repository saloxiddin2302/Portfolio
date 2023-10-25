import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/front/UserLayout";
import Login from "./pages/front/Login";
import Register from "./pages/front/Register.jsx";
// import Cookies from "js-cookie";
// import { Fragment } from "react";
// import AdminPanel from "./components/layout/admin/AdminPanel";
// import Skilspage from "./pages/admin/Dashboard";
import { TOKEN } from "./const";
import { ROLE } from "./utils";
import { adminRoutes } from "./const/menus";
import AdminLayout from "./components/layout/admin/AdminPanel";
import SkillsPage from "./pages/front/SkillsPage";
import HomePage from "./pages/front/HomePage";
import Resume from "./pages/front/Resume";
import { Dashboard, Experiences, Messages, Portfolios, Skills, Users } from "./pages/admin";
import Education from "./pages/admin/Education";
import PortfoliosPage from "./pages/front/PortfoliosPage";

// import { TOKEN, USER } from "./const";

function App() {
  const isAuthorized = localStorage.getItem(TOKEN) && ROLE !== "user";
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="skils" element={<SkillsPage />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<PortfoliosPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {isAuthorized && (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="education" element={<Education />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="messages" element={<Messages />} />
            <Route path="portfolios" element={<Portfolios />} />
            <Route path="skills" element={<Skills />} />
            <Route path="users" element={<Users />} />
          </Route>
        )}
        {/* <Route path="*" element={<NotFoundP />} /> */}
      </Routes>

      {/* <Routes>
        {isAuthorized &&
          adminRoutes.map(({ url, page: Page }, i) => (
            <Route
              key={i}
              path={"/" + url}
              element={
                <AdminLayout>
                  <Page />
                </AdminLayout>
              }
            />
          ))}
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
