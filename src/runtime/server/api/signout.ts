import { useRuntimeConfig } from "#imports";
import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  const { web3kit: { cookies } } = useRuntimeConfig().public;

  deleteCookie(event, cookies.signin)

  return "Signed out"
});