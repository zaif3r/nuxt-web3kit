import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAccountStore } from "../store/account";

export default defineNuxtRouteMiddleware(() => {
  const accountStore = useAccountStore();

  if (accountStore.status != "connected") {
    return navigateTo("/");
  }
});
