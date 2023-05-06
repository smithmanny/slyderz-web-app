import { Routes } from "@blitzjs/next";
import AddIcon from "@mui/icons-material/Add";

interface LoggedOutRouteType {
  id: number
  icon: any
  name: string
  route: any
}

interface LoggedInRouteType extends Partial<LoggedOutRouteType> {}
interface OnboarderdRouteType extends LoggedInRouteType {}

export const loggedOutRoutes: Array<LoggedOutRouteType> = [
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
export const loggedInRoutes: Array<LoggedInRouteType> = [
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
export const onboardedRoutes: Array<OnboarderdRouteType> = [
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
