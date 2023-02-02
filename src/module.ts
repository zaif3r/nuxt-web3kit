import {
  addPlugin,
  installModule,
  createResolver,
  addServerHandler,
  defineNuxtModule,
} from "@nuxt/kit";
import { goerli, mainnet } from "@wagmi/core/chains";
import { fileURLToPath } from "url";
import { defu } from "defu";

import type { WagmiConfig, ServerConfig } from "./runtime/types/config";

export interface ModuleOptions extends WagmiConfig, ServerConfig {}

export default defineNuxtModule<Partial<ModuleOptions>>({
  meta: {
    name: "@zaifer/nuxt-web3kit",
    configKey: "web3kit",
  },
  defaults: {
    autoConnect: true,
    fallbackProvider: false,
    routes: {
      signIn: "/api/__web3kit/auth/sign-in",
      signOut: "/api/__web3kit/auth/sign-out",
      storage: "/api/__web3kit/storage",
    },
    cookies: {
      signIn: "web3kit-auth",
    },
    jwt: {
      secret:
        process.env.NODE_ENV == "production"
          ? process.env.JWT_SECRET!!
          : "secret",
    },
    storage: {
      token: process.env.WEB3STORAGE_TOKEN!!,
    },
  },
  async setup(options, nuxt) {
    // Public runtimeConfig
    const publicConfig = (nuxt.options.runtimeConfig.public.web3kit = defu(
      nuxt.options.runtimeConfig.public.web3kit,
      {
        autoConnect: options.autoConnect,
        fallbackProvider: options.fallbackProvider,
        chains: options.chains ?? [mainnet, goerli],
        providers: options.providers,
        connectors: options.connectors,
        routes: options.routes,
        cookies: options.cookies,
      }
    ));

    // Private runtimeConfig
    nuxt.options.runtimeConfig.web3kit = defu(
      nuxt.options.runtimeConfig.web3kit,
      {
        jwt: options.jwt,
        storage: options.storage,
      }
    );

    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    await installModule("@zaifer/nuxt-query");
    await installModule("@pinia-plugin-persistedstate/nuxt");
    await installModule("@pinia/nuxt", {
      autoImports: ["defineStore"],
    });

    addPlugin(resolve(runtimeDir, "plugins", "wagmi-client"));
    addPlugin(resolve(runtimeDir, "plugins", "middleware"));

    nuxt.hook("modules:done", () => {
      addPlugin(resolve(runtimeDir, "plugins", "wagmi-state"), {
        append: true,
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
    });

    // Add server api
    const serverApi = resolve(runtimeDir, "server", "api");
    addServerHandler({
      route: publicConfig.routes.signIn,
      handler: resolve(serverApi, "sign-in"),
    });
    addServerHandler({
      route: publicConfig.routes.signOut,
      handler: resolve(serverApi, "sign-out"),
    });
    addServerHandler({
      route: publicConfig.routes.storage,
      handler: resolve(serverApi, "storage"),
    });

    // Optimize deps
    if (!nuxt.options.vite.optimizeDeps) {
      nuxt.options.vite.optimizeDeps = {
        include: [],
      };
    }
    if (!nuxt.options.vite.optimizeDeps.include) {
      nuxt.options.vite.optimizeDeps.include = [];
    }
    nuxt.options.vite.optimizeDeps.include.push(
      "ethers",
      "ethers/lib/utils",
      "@wagmi/core",
      "eventemitter3"
    );
  },
});
