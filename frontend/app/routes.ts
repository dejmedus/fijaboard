import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("home", "routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("profile", "routes/profile.tsx"),
  route("catalog", "routes/catalog.tsx"),
] satisfies RouteConfig;
