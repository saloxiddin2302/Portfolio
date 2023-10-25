import {
  Dashboard,
  Experiences,
  Messages,
  Portfolios,
  Skills,
  Users,
} from "../pages/admin";
import Education from "../pages/admin/Education";
import { ROLE } from "../utils";

const routes = [
  {
    url: "dashboard",
    page: Dashboard,
    label: "Dashboard",
  },
  {
    url: "users",
    page: Users,
    label: "Users",
  },
  {
    url: "experiences",
    page: Experiences,
    label: "Experiences",
  },
  {
    url: "education",
    page: Education,
    label: "Education",
  },
  {
    url: "messages",
    page: Messages,
    label: "Messages",
  },
  {
    url: "portfolios",
    page: Portfolios,
    label: "Portfolios",
  },
  {
    url: "skills",
    page: Skills,
    label: "Skills",
  },
];

let hiddenRoutes = ROLE === "client" ? ["users"] : [];

export const adminRoutes = routes.filter(
  (route) => !hiddenRoutes.includes(route.url)
);
