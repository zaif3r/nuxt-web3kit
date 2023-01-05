import { useAsyncData, useRuntimeConfig } from "#imports";
import { ref, toRaw } from "vue";
import { defu } from "defu";
import { useSignTypedData } from "vagmi";
import { useConnect } from "./useConnect";
import { useAccount } from "./useAccount";
import { SigninBody, SigninTypedData, SigninPayload } from "../types/signin";

export function useSignin(
  signArgs?: Parameters<typeof useSignTypedData>[0],
  connectArgs?: Parameters<typeof useConnect>[0]
) {
  const { web3kit: { routes } } = useRuntimeConfig().public;

  const account = useAccount();
  const connection = useConnect(connectArgs);
  const signer = useSignTypedData(signArgs);

  const signinBody = ref<SigninBody | null>(null);

  const signinData = useAsyncData(async () => {
    if (!connection.isConnected.value) {
      await connection.connectAsync.value();
    }

    await signer.signTypedDataAsync(signinBody.value?.typedData);

    await $fetch(routes.signin,  {
      method: "POST",
      body: toRaw({
        ...signinBody.value,
        signature: signer.data.value!!,
      }),
    });
  }, {
    lazy: true,
    immediate: false,
  });

  async function signin(typedData: SigninTypedData, payload?: SigninPayload) {
    signinBody.value = {
      typedData,
      signer: account.value.address as string,
      signature: signer.data.value as string,
      payload: defu(payload || {}, {
        address: account.value.address,
      }),
    };
    await signinData.execute();
  }

  return {
    ...signinData,
    signin,
  };
}
