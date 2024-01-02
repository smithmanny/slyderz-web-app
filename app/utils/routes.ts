import AddIcon from "@mui/icons-material/Add";

interface LoggedOutRouteType {
  id: number;
  icon: any;
  name: string;
  route: any;
}

type LoggedInRouteType = Partial<LoggedOutRouteType>;
type OnboarderdRouteType = LoggedInRouteType;

export const loggedOutRoutes: Array<LoggedOutRouteType> = [
  {
    id: 0,
    icon: AddIcon,
    name: "Sign up",
    route: "/signup",
  },
  {
    id: 1,
    icon: AddIcon,
    name: "Log in",
    route: "/login",
  }
];
export const loggedInRoutes: Array<LoggedInRouteType> = [
  {
    id: 0,
    name: "Account",
    route: "/account",
  },
  {
    id: 1,
    name: "Become a Host",
    route: "/host",
  },
];
export const chefLoggedInRoutes: Array<OnboarderdRouteType> = [
  {
    id: 0,
    name: "Account",
    route: "/account",
  },
  {
    id: 1,
    name: "Dashboard",
    route: "/dashboard",
  },
];
