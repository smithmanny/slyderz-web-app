import { Routes } from "@blitzjs/next";
import AddIcon from "@mui/icons-material/Add";

export const loggedOutRoutes = [
  {
    id: 0,
    icon: AddIcon,
    name: "Login",
    route: Routes.LoginPage(),
  },
  {
    id: 1,
    icon: AddIcon,
    name: "Register",
    route: Routes.SignupPage(),
  },
];
export const loggedInRoutes = [
  {
    id: 0,
    name: "Account",
    route: Routes.Account(),
  },
  {
    id: 1,
    name: "Become a Host",
    route: Routes.Host(),
  },
];
export const onboardedRoutes = [
  {
    id: 0,
    name: "Account",
    route: Routes.Account(),
  },
  {
    id: 1,
    name: "Dashboard",
    route: Routes.Dashboard(),
  },
];
