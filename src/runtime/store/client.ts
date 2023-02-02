import type { Connector } from "@wagmi/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClientStore = defineStore(
  "wagmi-client",
  () => {
    const chainId = ref<number | undefined>();
    const connectorId = ref<string | undefined>();

    function $connect(chainId_?: number, connector?: Connector) {
      chainId.value = chainId_;
      connectorId.value = connector?.id;
    }

    function $disconnect() {
      chainId.value = undefined;
      connectorId.value = undefined;
    }

    function $patchChainId(chainId_?: number) {
      chainId.value = chainId_;
    }

    return {
      chainId,
      connectorId,
      $connect,
      $disconnect,
      $patchChainId,
    };
  },
  {
    persist: true,
  }
);
