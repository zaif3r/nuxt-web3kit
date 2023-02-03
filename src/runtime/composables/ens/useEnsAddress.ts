import type { FetchEnsAddressArgs, FetchEnsAddressResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { fetchEnsAddress } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UsePrepareEnsAddressArgs = UseQueryArgs<FetchEnsAddressArgs>;

export type UsePrepareEnsAddressOptions = QueryOptions<
  FetchEnsAddressArgs,
  FetchEnsAddressResult
>;

export function useEnsAddress(
  args?: UsePrepareEnsAddressArgs,
  options?: UsePrepareEnsAddressOptions
): UseAsyncQueryResult<FetchEnsAddressArgs, FetchEnsAddressResult> {
  return useAsyncQuery({
    key: "useEnsAddress",
    asyncFn: fetchEnsAddress,
    args,
    options: {
      server: false,
      required: ["name"],
      watchArgs: ["name", "chainId"],
      ...options,
    },
  });
}
