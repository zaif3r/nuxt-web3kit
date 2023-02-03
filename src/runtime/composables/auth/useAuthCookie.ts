import type { CookieRef } from 'nuxt/app';
import { useCookie, useRuntimeConfig } from '#imports';

export function useAuthCookie(): CookieRef<string | null> {
  const { web3kit: { cookies } } = useRuntimeConfig().public;
  const cookie = useCookie(cookies.signIn);
  return cookie;
}