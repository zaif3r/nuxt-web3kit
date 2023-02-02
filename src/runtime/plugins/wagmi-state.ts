import { getAccount, watchAccount, watchNetwork } from "@wagmi/core";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

import { useAccountStore } from "../store/account";
import { useClientStore } from "../store/client";
import { useClient } from "../composables/client/useClient";

export default defineNuxtPlugin(async (nuxt) => {
  const { web3kit: config } = useRuntimeConfig().public;

  const client = useClient();
  const clientStore = useClientStore();
  const accountStore = useAccountStore();

  nuxt.hook("app:created", async () => {
    if (config.autoConnect) {
      await client.autoConnect();
    }

    const unsubscribe = client.subscribe(
      ({ status, connector, data }) => ({
        status,
        connector,
        data,
      }),
      ({ status, connector, data }, prev) => {
        if (status == prev.status) return;

        switch (status) {
          case "connected":
            clientStore.$connect(data?.chain?.id, connector);
            accountStore.$update(getAccount());
            break;
          case "disconnected":
            clientStore.$disconnect();
            accountStore.$clear();
            break;
        }
      }
    );

    const unwatchAccount = watchAccount((data) => {
      accountStore.$update(data);
    });

    const unwatchNetwork = watchNetwork((data) => {
      clientStore.$patchChainId(data?.chain?.id);
    });

    const originalUnmount = nuxt.vueApp.unmount;
    nuxt.vueApp.unmount = function vagmiUnmount() {
      unsubscribe();
      unwatchAccount();
      unwatchNetwork();
      originalUnmount();
    };
  });
});
