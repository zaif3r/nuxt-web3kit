import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/dist/app";
import { configureChains, createClient, VagmiPlugin } from "vagmi";

export default defineNuxtPlugin((nuxtApp) => {
  const { web3kit: { vagmi } } = useRuntimeConfig().public;

  const { provider, webSocketProvider } = configureChains(
    vagmi.chains,
    vagmi.providers,
    vagmi.config
  );

  const client = createClient({
    autoConnect: vagmi.autoConnect,
    connectors: vagmi.connectors,
    provider,
    webSocketProvider,
  });

  const plugin = VagmiPlugin(client);

  nuxtApp.vueApp.use(plugin);
});
