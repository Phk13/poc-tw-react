import Home from "../page/Home";
import Profile from "../page/Profile";
import Users from "../page/Users";
import Error404 from "../page/Error404";

export default [
  {
    path: "/users",
    page: Users,
  },
  {
    path: "/:id",
    page: Profile,
  },
  {
    path: "/",
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
