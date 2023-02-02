import type { SignMessageArgs, SignMessageResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { signMessage } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseSignMessageArgs = UseQueryArgs<SignMessageArgs>;

export type UseSignMessageOptions = QueryOptions<
  SignMessageArgs,
  SignMessageResult
>;

export function useSignMessage(
  args?: UseSignMessageArgs,
  options?: UseSignMessageOptions
) {
  return useAsyncQuery({
    key: "useSignMessage",
    asyncFn: signMessage,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["message"],
      ...options,
    },
  });
}
