import { defineNuxtPlugin, addRouteMiddleware } from "#app";
import Connected from "../middleware/connected";
import SignedIn from "../middleware/signedin";

export default defineNuxtPlugin(() => {
  addRouteMiddleware("connected", Connected);
  addRouteMiddleware("signedin", SignedIn);
});
