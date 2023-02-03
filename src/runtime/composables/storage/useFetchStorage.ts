import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { useAsyncQuery } from "#imports";

import type { FetchStorageArgs, FetchStorageResult } from "../../types/storage";

export type UseFetchStorageArgs = UseQueryArgs<FetchStorageArgs>;

export type UseFetchStorageOptions<T> = QueryOptions<
  FetchStorageArgs,
  FetchStorageResult<T>
>;

export function useFetchStorage<T>(
  args?: UseFetchStorageArgs,
  options?: UseFetchStorageOptions<T>
): UseAsyncQueryResult<FetchStorageArgs, FetchStorageResult<T>> {
  return useAsyncQuery({
    key: "useFetchStorage",
    args,
    options: {
      immediate: false,
      required: ["cid", "fileName"],
      ...options,
    },
    asyncFn: async ({ cid, fileName }) => {
      const url = `https://${cid}.ipfs.w3s.link/${fileName}`;
      const data = await $fetch<T>(url);
      return { url, data };
    },
  });
}
