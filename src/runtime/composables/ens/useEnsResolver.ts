import type { FetchEnsResolverArgs, FetchEnsResolverResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult } from "@zaifer/nuxt-query";
import { fetchEnsResolver } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

import type { UseQueryArgs } from "../../types/query";

export type UseEnsResolverArgs = UseQueryArgs<FetchEnsResolverArgs>;

export type UseEnsResolverOptions = QueryOptions<
  FetchEnsResolverArgs,
  FetchEnsResolverResult
>;

export function useEnsResolver(
  args?: UseEnsResolverArgs,
  options?: UseEnsResolverOptions
): UseAsyncQueryResult<FetchEnsResolverArgs, FetchEnsResolverResult> {
  return useAsyncQuery({
    key: args?.key ?? "useEnsResolver",
    asyncFn: fetchEnsResolver,
    args,
    options: {
      server: false,
      required: ["name"],
      watchArgs: ["name", "chainId"],
      ...options,
    },
  });
}
