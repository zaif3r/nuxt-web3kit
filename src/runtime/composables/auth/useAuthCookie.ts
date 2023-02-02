import { useCookie, useRuntimeConfig } from '#imports';

export function useAuthCookie() {
  const { web3kit: { cookies } } = useRuntimeConfig().public;
  const cookie = useCookie(cookies.signIn);
  return cookie;
}