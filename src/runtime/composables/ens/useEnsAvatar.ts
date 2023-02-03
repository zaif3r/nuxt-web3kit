import type { FetchEnsAvatarArgs, FetchEnsAvatarResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { fetchEnsAvatar } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

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
    key: "useEnsAvatar",
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
