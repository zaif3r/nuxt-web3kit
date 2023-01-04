import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useConnectionCookie } from "../composables/useConnectionCookie";

export default defineNuxtRouteMiddleware(() => {
  const connectionCookie = useConnectionCookie();

  if (!connectionCookie.value?.isConnected) {
    return navigateTo("/");
  }
});
