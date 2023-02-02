import type { SendTransactionArgs, SendTransactionResult } from "@wagmi/core";
import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { sendTransaction } from "@wagmi/core";
import { useAsyncQuery } from "#imports";

export type UsePrepareSendTransactionArgs = UseQueryArgs<SendTransactionArgs>;

export type UsePrepareSendTransactionOptions = QueryOptions<
  SendTransactionArgs,
  SendTransactionResult
>;

export function useSendTransaction(
  args?: UsePrepareSendTransactionArgs,
  options?: UsePrepareSendTransactionOptions
) {
  return useAsyncQuery({
    key: "useSendTransaction",
    asyncFn: sendTransaction,
    args,
    options: {
      server: false,
      immediate: false,
      required: ["mode", "request"],
      ...options,
    },
  });
}
