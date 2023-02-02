import type { FetchBalanceArgs, FetchBalanceResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { useAsyncQuery } from "#imports";
import { fetchBalance } from "@wagmi/core";

export type UseBalanceArgs = UseQueryArgs<FetchBalanceArgs>;

export type UseBalanceOptions = QueryOptions<
  FetchBalanceArgs,
  FetchBalanceResult
>;

export function useBalance(args?: UseBalanceArgs, options?: UseBalanceOptions) {
  return useAsyncQuery({
    key: "useBalance",
    asyncFn: fetchBalance,
    args,
    options: {
      server: false,
      required: ["address"],
      watchArgs: ["address", "chainId", "token", "formatUnits"],
      ...options,
    },
  });
}
