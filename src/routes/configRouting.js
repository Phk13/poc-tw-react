import Home from "../page/Home";
import Profile from "../page/Profile";
import Error404 from "../page/Error404";

export default [
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
