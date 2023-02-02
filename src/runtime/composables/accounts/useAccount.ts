import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useAccountStore } from "../../store/account";

export function useAccount() {
  const { address, status } = storeToRefs(useAccountStore());

  return {
    address: computed(() => address.value),
    status: computed(() => status.value),
    isConnected: computed(() => status.value == "connected"),
    isReconnecting: computed(() => status.value == "reconnecting"),
    isConnecting: computed(() => status.value == "connecting"),
    isDisconnected: computed(() => status.value == "disconnected"),
    shortAddress: computed(() => {
      if (address.value) {
        return address.value.slice(0, 6) + "..." + address.value.slice(-4);
      }
      return undefined;
    }),
  };
}
