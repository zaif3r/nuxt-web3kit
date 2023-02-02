import type { SwitchNetworkArgs, SwitchNetworkResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { switchNetwork } from "@wagmi/core";
import { useAsyncQuery } from "#imports";
import { computed } from "vue";

export type UsePrepareSwitchNetworkArgs = UseQueryArgs<SwitchNetworkArgs>;

export type UseSwitchNetworkOptions = QueryOptions<
  SwitchNetworkArgs,
  SwitchNetworkResult
>;

export function useSwitchNetwork(
  args?: UsePrepareSwitchNetworkArgs,
  options?: UseSwitchNetworkOptions
) {
  const query = useAsyncQuery<SwitchNetworkArgs, SwitchNetworkResult>({
    key: "useSwitchNetwork",
    asyncFn: async ({ chainId: chain }) => {
      const chainId = typeof chain === "string" ? parseInt(chain) : chain;
      return await switchNetwork({ chainId });
    },
    args,
    options: {
      server: false,
      immediate: false,
      required: ["chainId"],
      ...options,
    },
  });

  const pendingChainId = computed(() => {
    return query.pending.value ? query.args.value?.chainId : undefined;
  });

  return {
    ...query,
    pendingChainId,
  };
}
