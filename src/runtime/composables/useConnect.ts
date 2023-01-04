import { useRuntimeConfig } from "#imports";
import { useConnect as useVagmiConnect } from "vagmi";
import { useConnectionCookie } from "./useConnectionCookie";

export function useConnect(connectArgs?: Parameters<typeof useVagmiConnect>[0]) {
  const { web3kit: { vagmi: config } } = useRuntimeConfig().public;

  const connectionCookie = useConnectionCookie();

  const vagmiConnect = useVagmiConnect({
    ...connectArgs,
    onConnect: (result, args, context) => {
      if (config.autoConnect) {
        connectionCookie.value = {
          isConnected: true,
        };
      }

      connectArgs?.onConnect?.(result, args, context);
    },
  });

  return vagmiConnect;
}
