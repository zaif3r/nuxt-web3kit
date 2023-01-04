import { useFetch, useRuntimeConfig } from "#imports";
import { ref, toRaw } from "vue";
import { defu } from "defu";
import { useSignTypedData } from "vagmi";
import { useConnect } from "./useConnect";
import { useAccount } from "./useAccount";
import { SigninBody, SigninArgs, SigninPayload } from "../types/signin";

export function useSignin(
  signArgs?: Parameters<typeof useSignTypedData>[0],
  connectArgs?: Parameters<typeof useConnect>[0]
) {
  const { web3kit: { routes } } = useRuntimeConfig().public;

  const account = useAccount();
  const connection = useConnect(connectArgs);
  const signer = useSignTypedData(signArgs);

  const error = ref<string | null>(null);
  const pending = ref<boolean>(false);
  const signinBody = ref<SigninBody | null>(null);

  const fetchSignin = useFetch(routes.signin, {
    method: "POST",
    body: toRaw(signinBody),
    watch: [signinBody],
    immediate: false,
  });

  async function signin(signArgs: SigninArgs, payload?: SigninPayload) {
    pending.value = true;

    try {
      if (!connection.isConnected.value || !account.value.address) {
        await connection.connectAsync.value();
      }

      await signer.signTypedDataAsync(signArgs);

      signinBody.value = {
        typedData: signArgs,
        signer: account.value.address!!,
        signature: signer.data.value!!,
        payload: defu(payload || {}, {
          address: account.value.address,
        }),
      };

      await fetchSignin.execute();
    } catch (err: any) {
      error.value = err.message;
    }

    pending.value = false;
  }

  return {
    error,
    pending,
    signin,
  };
}
