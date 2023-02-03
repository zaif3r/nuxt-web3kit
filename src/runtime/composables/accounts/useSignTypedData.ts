import type { SignTypedDataArgs, SignTypedDataResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { signTypedData } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseSignTypedDataArgs = UseQueryArgs<SignTypedDataArgs>;

export type UseSignTypedDataOptions = QueryOptions<
  SignTypedDataArgs,
  SignTypedDataResult
>;

export function useSignTypedData(
  args?: UseSignTypedDataArgs,
  options?: UseSignTypedDataOptions
): UseAsyncQueryResult<SignTypedDataArgs, SignTypedDataResult> {
  return useAsyncQuery({
    key: "useSignTypedData",
    asyncFn: signTypedData,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["domain", "types", "value"],
      ...options,
    },
  });
}
