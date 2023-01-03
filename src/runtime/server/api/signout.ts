import { useRuntimeConfig } from "#imports";
import { defineEventHandler, assertMethod, deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  assertMethod(event, "GET");

  const { web3kit: { cookies } } = useRuntimeConfig().public;

  deleteCookie(event, cookies.signin)

  return "Signed out"
});