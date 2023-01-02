import { useRuntimeConfig } from "#app";
import { watch, computed } from "vue";
import {
  useAccount as useVagmiAccount,
  useConnect as useVagmiConnect,
  useDisconnect as useVagmiDisconnect,
} from "vagmi";
import { useAccountState } from "./useAccountState";
import { useConnectionCookie } from "./useConnectionCookie";

export function useConnect(connectArgs: Parameters<typeof useVagmiConnect>[0]) {
  const {
    web3kit: { vagmi: config },
  } = useRuntimeConfig().public;

  const vagmiAccount = useVagmiAccount();
  const vagmiDisconnect = useVagmiDisconnect();
  const vagmiConnect = useVagmiConnect({
    ...connectArgs,
    onConnect: (result, args, context) => {
      setAccount(vagmiAccount);

      if (config.autoConnect) {
        connectionCookie.value = {
          isConnected: true,
        };
      }

      connectArgs?.onConnect?.(result, args, context);
    },
  });

  const { setState: setAccount } = useAccountState();
  const connectionCookie = useConnectionCookie();

  async function connect() {
    await vagmiConnect.connectAsync.value();
  }

  async function disconnect() {
    await vagmiDisconnect.disconnectAsync();
  }

  watch(vagmiAccount.status, (status) => {
    if (status == "connected") {
      setAccount(vagmiAccount);
    } else if (status == "disconnected") {
      setAccount(null);
      connectionCookie.value = {
        isConnected: false,
      };
    }
  });

  const isConnected = computed(() => {
    if (config.autoConnect) {
      return (
        vagmiAccount.isConnected.value || !!connectionCookie.value?.isConnected
      );
    }
    return vagmiAccount.isConnected.value;
  });

  return {
    connect,
    disconnect,
    isConnected,
  };
}
