import type { Chain } from "@wagmi/core";
import { useRuntimeConfig } from "#imports";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useClientStore } from "../../store/client";

export function useNetwork() {
  const { chains } = useRuntimeConfig().public.web3kit;
  const defaultChains = chains as Chain[];

  const { chainId } = storeToRefs(useClientStore());

  return {
    chain: computed(() => defaultChains.find((c) => c.id == chainId.value)),
    chains: computed(() => defaultChains),
  };
}
