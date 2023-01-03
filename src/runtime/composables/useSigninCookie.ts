import { useCookie, useRuntimeConfig } from "#imports";
import { computed } from "vue";

export type SigninCookie = string | null

export function useSigninCookie() {
  const { web3kit: { cookies } } = useRuntimeConfig().public;

  const signinCookie = useCookie<SigninCookie>(cookies.signin);

  return computed(() => signinCookie.value);
}
