import type { ConnectArgs, SignMessageArgs } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { connect, disconnect, signMessage } from "@wagmi/core";
import { useRuntimeConfig, useAsyncQuery } from "#imports";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

import type { SignInArgs, SignInResult } from "../../types/sign-in";
import { useAccountStore } from "../../store/account";

export type UseSignInWithMessageArgs = UseQueryArgs<
  ConnectArgs & SignMessageArgs
>;

export type UseSignInWithMessageOptions = QueryOptions<
  ConnectArgs & SignMessageArgs,
  SignInResult
>;

export function useSignInWithMessage(
  args?: UseSignInWithMessageArgs,
  options?: UseSignInWithMessageOptions
): UseAsyncQueryResult<ConnectArgs & SignMessageArgs, SignInResult> {
  const { routes } = useRuntimeConfig().public.web3kit;
  const { address, status } = storeToRefs(useAccountStore());

  return useAsyncQuery({
    key: "useSignInWithMessage",
    args,
    options: {
      server: false,
      immediate: false,
      required: ["message", "connector"],
      ...options,
    },
    asyncFn: async ({ chainId, connector, message }) => {
      if (status.value != "connected") {
        await connect({ chainId, connector });
      }
      try {
        const signature = await signMessage({ message });

        const result = await $fetch<SignInResult>(routes.signIn, {
          method: "POST",
          body: toRaw<SignInArgs>({
            message,
            signature,
            signer: address.value!!,
            payload: {
              address: address.value!!,
            },
          }),
        });

        return result;
      } catch (error: any) {
        await disconnect();
        throw error;
      }
    },
  });
}
