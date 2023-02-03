import type {
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult,
} from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { prepareSendTransaction } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UsePrepareSendTransactionArgs =
  UseQueryArgs<PrepareSendTransactionArgs>;

export type UsePrepareSendTransactionOptions = QueryOptions<
  PrepareSendTransactionArgs,
  PrepareSendTransactionResult
>;

export function usePrepareSendTransaction(
  args?: UsePrepareSendTransactionArgs,
  options?: UsePrepareSendTransactionOptions
): UseAsyncQueryResult<PrepareSendTransactionArgs, PrepareSendTransactionResult> {
  return useAsyncQuery({
    key: "prepareSendTransaction",
    asyncFn: prepareSendTransaction,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["request"],
      ...options,
    },
  });
}
