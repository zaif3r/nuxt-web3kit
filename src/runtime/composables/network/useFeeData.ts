import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import type { FetchFeeDataArgs, FetchFeeDataResult } from "@wagmi/core";
import { fetchFeeData } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseFeeDataArgs = UseQueryArgs<FetchFeeDataArgs>;

export type UseFeeDataOptions = QueryOptions<
  FetchFeeDataArgs,
  FetchFeeDataResult
>;

export function useFeeData(
  args?: UseFeeDataArgs,
  options?: UseFeeDataOptions
): UseAsyncQueryResult<FetchFeeDataArgs, FetchFeeDataResult> {
  return useAsyncQuery({
    key: "useFeeData",
    asyncFn: fetchFeeData,
    args,
    options: {
      server: false,
      watchArgs: ["chainId", "formatUnits"],
      ...options,
    },
  });
}
