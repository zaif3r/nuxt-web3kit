import { useAsyncData, useRuntimeConfig } from "#imports";
import { useDisconnect } from "vagmi";

export default function () {
  const { web3kit: { routes } } = useRuntimeConfig().public;

  const connection = useDisconnect();

  const signoutData = useAsyncData(async () => {
    await $fetch(routes.signout);

    await connection.disconnectAsync()
  }, {
    lazy: true,
    immediate: false,
  });

  async function signout() {
    await signoutData.execute();
  }

  return {
    ...signoutData,
    signout,
  };
}
