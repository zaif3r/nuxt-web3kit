import type {
  WriteContractPreparedArgs,
  WriteContractResult,
} from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import type { Abi } from "abitype";
import { writeContract } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UseWriteContractArgs<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
> = UseQueryArgs<WriteContractPreparedArgs<TAbi, Fn>>;

export type UseWriteContractOptions<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
> = QueryOptions<WriteContractPreparedArgs<TAbi, Fn>, WriteContractResult>;

export function useWriteContract<
  TAbi extends Abi | readonly unknown[],
  Fn extends string
>(
  args?: UseWriteContractArgs<TAbi, Fn>,
  options?: UseWriteContractOptions<TAbi, Fn>
): UseAsyncQueryResult<WriteContractPreparedArgs<TAbi, Fn>, WriteContractResult> {
  return useAsyncQuery({
    key: "useWriteContract",
    asyncFn: writeContract,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["mode", "address", "abi", "functionName"],
      ...options,
    },
  });
}
