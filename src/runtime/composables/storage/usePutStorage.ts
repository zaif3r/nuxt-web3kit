import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { useRuntimeConfig, useAsyncQuery } from "#imports";
import { toRaw } from "vue";

import type {
  StorageServerArgs,
  StorageServerResult,
} from "../../types/storage";

export type UseStorageArgs = UseQueryArgs<StorageServerArgs>;

export type UseStorageOptions = QueryOptions<
  UseStorageArgs,
  StorageServerResult
>;

export function usePutStorage(
  args?: UseStorageArgs,
  options?: UseStorageOptions
) {
  const { routes } = useRuntimeConfig().public.web3kit;

  return useAsyncQuery({
    key: "usePutStorage",
    args,
    options: {
      server: false,
      immediate: false,
      required: ["files"],
      ...options,
    },
    asyncFn: async (body) => {
      return await $fetch(routes.storage, {
        method: "POST",
        body: toRaw(body),
      });
    },
  });
}
