import { defineNuxtPlugin, addRouteMiddleware } from "#app";
import Connected from "../middleware/connected";

export default defineNuxtPlugin(() => {
  addRouteMiddleware("connected", Connected);
});
