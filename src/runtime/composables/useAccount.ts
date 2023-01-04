import { useRuntimeConfig } from "#imports";
import { computed, watch } from "vue";
import { useAccountState } from "./useAccountState";
import { useConnectionCookie } from "./useConnectionCookie";
import { useAccount as useVagmiAccount } from "vagmi";

export function useAccount() {
  const { web3kit: { vagmi } } = useRuntimeConfig().public;

  const { account, setState } = useAccountState();
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

  const vagmiAccount = useVagmiAccount();

  watch(vagmiAccount.status, (status) => {
    if (status == "connected") {
      setState({
        address: vagmiAccount.address.value,
        isConnected: vagmiAccount.isConnected.value,
      });
    } else  if (status == "disconnected") {
      setState(null);
      connectionCookie.value = {
        isConnected: false,
      };
    }
  });

  return {
    account: computed(() => account.value ?? {}),
    isConnected,
  };
}
