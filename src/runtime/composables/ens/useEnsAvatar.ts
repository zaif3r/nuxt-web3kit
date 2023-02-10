import type { FetchEnsAvatarArgs, FetchEnsAvatarResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult } from "@zaifer/nuxt-query";
import { fetchEnsAvatar } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

import type { UseQueryArgs } from "../../types/query";

export type UseEnsAvatarArgs = UseQueryArgs<FetchEnsAvatarArgs>;

export type UseEnsAvatarOptions = QueryOptions<
  FetchEnsAvatarArgs,
  FetchEnsAvatarResult
>;

export function useEnsAvatar(
  args?: UseEnsAvatarArgs,
  options?: UseEnsAvatarOptions
): UseAsyncQueryResult<FetchEnsAvatarArgs, FetchEnsAvatarResult> {
  return useAsyncQuery({
    key: args?.key ?? "useEnsAvatar",
    asyncFn: fetchEnsAvatar,
    args,
    options: {
      server: false,
      required: ["address"],
      watchArgs: ["address", "chainId"],
      ...options,
    },
  });
}
