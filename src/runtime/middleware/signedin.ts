import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSigninCookie } from "../composables/useSigninCookie";

export default defineNuxtRouteMiddleware(() => {
  const signinCookie = useSigninCookie();

  if (!signinCookie.value) {
    return navigateTo("/");
  }
});
