import { useCookie } from "#app";

export const ConnectionCookieKey = "web3kit.connection" as const;

export interface ConnectionCookie {
  isConnected: boolean;
}

export function useConnectionCookie() {
  const connectionCookie = useCookie<ConnectionCookie>(ConnectionCookieKey, {
    default: () => ({
      isConnected: false,
    }),
  });

  return connectionCookie;
}
