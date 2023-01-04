import { useCookie, useRuntimeConfig } from "#imports";

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
