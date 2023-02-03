import type { SwitchNetworkArgs, SwitchNetworkResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { switchNetwork } from "@wagmi/core";
import { useAsyncQuery } from "#imports";
import { ComputedRef, computed } from "vue";

export type UsePrepareSwitchNetworkArgs = UseQueryArgs<SwitchNetworkArgs>;

export type UseSwitchNetworkOptions = QueryOptions<
  SwitchNetworkArgs,
  SwitchNetworkResult
>;

export type UseSwitchNetworkResult = UseAsyncQueryResult<
  SwitchNetworkArgs,
  SwitchNetworkResult
> & {
  pendingChainId: ComputedRef<number | undefined>;
};

export function useSwitchNetwork(
  args?: UsePrepareSwitchNetworkArgs,
  options?: UseSwitchNetworkOptions
): UseSwitchNetworkResult {
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
