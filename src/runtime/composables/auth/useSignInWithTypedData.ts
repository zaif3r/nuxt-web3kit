import type { ConnectArgs, SignTypedDataArgs } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import { connect, disconnect, signTypedData } from "@wagmi/core";
import { useRuntimeConfig, useAsyncQuery } from "#imports";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

import type { SignInArgs, SignInResult } from "../../types/sign-in";
import { useAccountStore } from "../../store/account";

export type UseSignInWithMessageArgs = UseQueryArgs<
  ConnectArgs & SignTypedDataArgs
>;

export type UseSignInWithMessageOptions = QueryOptions<
  ConnectArgs & SignTypedDataArgs,
  SignInResult
>;

export function useSignInWithTypedData(
  args?: UseSignInWithMessageArgs,
  options?: UseSignInWithMessageOptions
): UseAsyncQueryResult<ConnectArgs & SignTypedDataArgs, SignInResult> {
  const { routes } = useRuntimeConfig().public.web3kit;
  const { address, status } = storeToRefs(useAccountStore());

  return useAsyncQuery({
    key: "useSignInWithTypedData",
    args,
    options: {
      server: false,
      immediate: false,
      required: ["domain", "types", "value", "connector"],
      ...options,
    },
    asyncFn: async ({ chainId, connector, ...args }) => {
      if (status.value != "connected") {
        await connect({ chainId, connector });
      }

      try {
        const signature = await signTypedData(args);

        return await $fetch<SignInResult>(routes.signIn, {
          method: "POST",
          body: toRaw<SignInArgs>({
            args,
            signature,
            signer: address.value!!,
            payload: {
              address: address.value!!,
            },
          }),
        });
      } catch (error: any) {
        await disconnect();
        throw error;
      }
    },
  });
}
