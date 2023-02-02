import { defineNuxtRouteMiddleware, navigateTo } from "#app";

import { useAuthCookie } from "../composables/auth/useAuthCookie";

export default defineNuxtRouteMiddleware(() => {
  const authCookie = useAuthCookie();

  if (!authCookie.value) {
    return navigateTo("/");
  }
});
