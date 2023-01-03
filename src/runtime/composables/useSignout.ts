import { useFetch, useRuntimeConfig } from "#app";
import { useDisconnect } from "vagmi";

export default function () {
  const { web3kit: { routes } } = useRuntimeConfig().public;

  const connection = useDisconnect();

  const fetchSignout = useFetch(routes.signout, {
    immediate: false,
  });

  async function signout() {
    await fetchSignout.execute();

    await connection.disconnectAsync()
  }

  return {
    data: connection,
    signout,
  };
}
