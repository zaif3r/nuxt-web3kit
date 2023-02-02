import { defineEventHandler, assertMethod, deleteCookie } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  assertMethod(event, "GET");

  const { cookies } = useRuntimeConfig().public.web3kit;
  deleteCookie(event, cookies.signIn);
  return "Signed out";
});
