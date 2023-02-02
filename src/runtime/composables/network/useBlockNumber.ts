import type { QueryArgs } from "@zaifer/nuxt-query";
import type { FetchBlockNumberArgs } from "@wagmi/core";
import { computed, toRaw, watch, shallowRef } from "vue";
import { get, tryOnScopeDispose } from "@vueuse/core";
import { watchBlockNumber } from "@wagmi/core";

export type UseBlockNumberArgs = QueryArgs<FetchBlockNumberArgs> & {
  listen?: boolean;
};

export function useBlockNumber(
  { chainId, listen = true }: UseBlockNumberArgs = { listen: true }
) {
  const blockNumber = ref<number | undefined>();

  const unwatch = shallowRef(
    watchBlockNumber({ listen, chainId: toRaw(get(chainId)) }, (data) => {
      blockNumber.value = data;
    })
  );

  if (isRef(chainId)) {
    watch(chainId, (newChainId) => {
      unwatch.value();
      unwatch.value = watchBlockNumber(
        { listen, chainId: toRaw(newChainId) },
        (data) => {
          blockNumber.value = data;
        }
      );
    });
  }

  tryOnScopeDispose(unwatch.value);

  return {
    data: computed(() => blockNumber.value),
  };
}
