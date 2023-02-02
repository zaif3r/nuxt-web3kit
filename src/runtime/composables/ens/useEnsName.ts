import type { FetchEnsNameArgs, FetchEnsNameResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { fetchEnsName } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseEnsNameArgs = UseQueryArgs<FetchEnsNameArgs>;

export type UseEnsNameOptions = QueryOptions<
  FetchEnsNameArgs,
  FetchEnsNameResult
>;

export function useEnsName(args?: UseEnsNameArgs, options?: UseEnsNameOptions) {
  return useAsyncQuery({
    key: "useEnsName",
    asyncFn: fetchEnsName,
    args,
    options: {
      server: false,
      required: ["address"],
      watchArgs: ["address", "chainId"],
      ...options,
    },
  });
}
