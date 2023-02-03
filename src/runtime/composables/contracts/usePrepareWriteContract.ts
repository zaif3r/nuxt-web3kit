import type {
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
} from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { prepareWriteContract } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UsePrepareWriteContractArgs =
  UseQueryArgs<PrepareWriteContractConfig>;

export type UsePrepareWriteContractOptions = QueryOptions<
  PrepareWriteContractConfig,
  PrepareWriteContractResult
>;

export function usePrepareWriteContract(
  args?: UsePrepareWriteContractArgs,
  options?: UsePrepareWriteContractOptions
): UseAsyncQueryResult<PrepareWriteContractConfig, PrepareWriteContractResult> {
  return useAsyncQuery({
    key: "usePrepareWriteContract",
    asyncFn: prepareWriteContract,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["address", "abi", "functionName", "args"],
      ...options,
    },
  });
}
