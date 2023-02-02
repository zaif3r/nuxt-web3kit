import type { FetchSignerArgs, FetchSignerResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { fetchSigner } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

import { useConnector } from "../client/useConnector";

export type UseSignerArgs = UseQueryArgs<FetchSignerArgs>;

export type UseSignerOptions = QueryOptions<FetchSignerArgs, FetchSignerResult>;

export function useSigner(args?: UseSignerArgs, options?: UseSignerOptions) {
  const activeConnector = useConnector();

  return useAsyncQuery({
    key: "useSigner",
    asyncFn: fetchSigner,
    args,
    options: {
      server: false,
      watchArgs: ["chainId"],
      watch: [activeConnector],
      ...options,
    },
  });
}
