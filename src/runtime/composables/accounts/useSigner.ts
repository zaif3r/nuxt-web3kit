import type { FetchSignerArgs, FetchSignerResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { fetchSigner } from "@wagmi/core";
import { useAsyncQuery } from "#imports";
import { storeToRefs } from "pinia";

import { useConnector } from "../client/useConnector";
import { useClientStore } from "../../store/client";

export type UseSignerArgs = UseQueryArgs<FetchSignerArgs>;

export type UseSignerOptions = QueryOptions<FetchSignerArgs, FetchSignerResult>;

export function useSigner(
  args?: UseSignerArgs,
  options?: UseSignerOptions
): UseAsyncQueryResult<FetchSignerArgs, FetchSignerResult> {
  const activeConnector = useConnector();
  const { chainId } = storeToRefs(useClientStore());

  return useAsyncQuery({
    key: "useSigner",
    asyncFn: fetchSigner,
    args,
    options: {
      server: false,
      watchArgs: ["chainId"],
      watch: [activeConnector, chainId],
      ...options,
    },
  });
}
