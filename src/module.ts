import { fileURLToPath } from "url";
import { defineNuxtModule, createResolver, addPlugin } from "@nuxt/kit";
import { defu } from "defu";
import { defaultChains, Chain } from "vagmi";
import {
  VagmiProvider,
  VagmiConnector,
  VagmiConfigureChainsOptions,
} from "./runtime/plugins/vagmi";

export interface ModuleOptions {
  vagmi: {
    autoConnect?: boolean;
    chains?: Chain[];
    providers?: VagmiProvider[];
    connectors?: VagmiConnector[];
    config?: VagmiConfigureChainsOptions;
  };
  cookies?: {
    connection?: string;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@zaifer/nuxt-web3kit",
    configKey: "web3kit",
  },
  defaults: {
    vagmi: {
      autoConnect: false,
      chains: defaultChains,
    },
    cookies: {
      connection: "web3kit-connection",
    },
  },
  setup(options, nuxt) {
    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.web3kit = defu(
      nuxt.options.runtimeConfig.public.web3kit,
      {
        vagmi: options.vagmi,
        cookies: options.cookies,
      }
    );

    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));

    addPlugin(resolve(runtimeDir, "plugins", "vagmi"));

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
    });
  },
});
