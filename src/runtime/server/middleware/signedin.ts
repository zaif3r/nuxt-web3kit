import { useRuntimeConfig } from "#imports";
import { defineEventHandler, getCookie, createError } from "h3";

export default defineEventHandler(async (event) => {
  const { web3kit: { cookies, routes } } = useRuntimeConfig().public;

  const signinCookie = getCookie(event, cookies.signin);

  const protectedRoute =
    routes.protected.includes(event.path) ||
    routes.protected.some((route: string) => event.path?.startsWith(route));

  if (protectedRoute && !signinCookie) {
    return createError({
      status: 403,
      message: "Not signed in",
    });
  }
});
