import type { QueryOptions, UseAsyncQueryResult } from "@zaifer/nuxt-query";
import { disconnect } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseDisconnectOptions = QueryOptions<{}, void>;

export function useDisconnect(options?: UseDisconnectOptions): UseAsyncQueryResult<{}, void> {
  return useAsyncQuery({
    key: "useDisconnect",
    asyncFn: disconnect,
    options: {
      server: false,
      immediate: false,
      ...options,
    },
  });
}
