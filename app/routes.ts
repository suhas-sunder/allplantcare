import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home page
  index("routes/home.tsx"),

  // Indoor Plant Watering Calculator
  route(
    "indoor-plants-watering-calculator",
    "routes/indoor-plants-watering-calculator.tsx"
  ),
] satisfies RouteConfig;
