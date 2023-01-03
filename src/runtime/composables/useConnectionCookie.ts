import { useCookie } from "#app";

export const ConnectionCookieKey = "web3kit.connection" as const;

export interface ConnectionCookie {
  isConnected: boolean;
}

export function useConnectionCookie() {
  const { web3kit: { cookies } } = useRuntimeConfig().public;

  const connectionCookie = useCookie<ConnectionCookie>(cookies.connection, {
    default: () => ({
      isConnected: false,
    }),
  });

  return connectionCookie;
}
