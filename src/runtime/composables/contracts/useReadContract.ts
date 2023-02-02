import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import type { ReadContractConfig, ReadContractResult } from "@wagmi/core";
import type { Abi } from "abitype";
import { readContract } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseReadContractArgs<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
> = UseQueryArgs<ReadContractConfig<TAbi, Fn>>;

export type UseReadContractOptions<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
> = QueryOptions<ReadContractConfig<TAbi, Fn>, ReadContractResult<TAbi, Fn>>;

export function useReadContract<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
>(
  args?: UseReadContractArgs<TAbi, Fn>,
  options?: UseReadContractOptions<TAbi, Fn>
) {
  return useAsyncQuery({
    key: "useReadContract",
    asyncFn: readContract,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["address", "abi", "functionName"],
      ...options,
    },
  });
}
