import { useRuntimeConfig } from "#app";
import { computed } from "vue";
import { useAccountState } from "./useAccountState";
import { useConnectionCookie } from "./useConnectionCookie";

export function useAccount() {
  const {
    web3kit: { vagmi },
  } = useRuntimeConfig().public;

  const { account } = useAccountState();
  const connectionCookie = useConnectionCookie();

  const isConnected = computed<boolean>(() => {
    if (vagmi.autoConnect) {
      return (
        (account.value?.isConnected || connectionCookie.value?.isConnected) ??
        false
      );
    }
    return account.value?.isConnected ?? false;
  });

  return {
    account: computed(() => account.value ?? {}),
    isConnected,
  };
}
