import { defineNuxtPlugin, addRouteMiddleware } from "#app";
import connected from "../middleware/connected";
import signedIn from "../middleware/signed-in";

export default defineNuxtPlugin(() => {
  addRouteMiddleware("connected", connected);
  addRouteMiddleware("signed-in", signedIn);
});
