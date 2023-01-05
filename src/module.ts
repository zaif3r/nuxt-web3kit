import { fileURLToPath } from "url";
import { defineNuxtModule, createResolver, addPlugin, addServerHandler } from "@nuxt/kit";
import { defu } from "defu";
import { Chain, defaultChains } from "vagmi";
import {
  VagmiProvider,
  VagmiConnector,
  VagmiConfigureChainsOptions,
} from "./runtime/types/vagmi";
import jwt from "jsonwebtoken";

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
    signin?: string;
  };
  routes: {
    signin?: string;
    signout?: string;
    storage?: string;
    protected?: string[];
  };
  jwt?: {
    secret: string;
    options?: jwt.SignOptions;
  };
  storage?: {
    token?: string;
  };
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
      signin: "web3kit-signin",
    },
    routes: {
      signin: "/api/__web3kit/signin",
      signout: "/api/__web3kit/signout",
      storage: "/api/__web3kit/storage",
      protected: [
        "/api/__web3kit/storage",
      ],
    },
    jwt: {
      secret: process.env.WEB3KIT_JWT_SECRET || "secret",
    },
    storage: {
      token: process.env.WEB3KIT_WEB3STORAGE_TOKEN!!,
    },
  },
  setup(options, nuxt) {
    // Public runtimeConfig
    const publicConfig = (nuxt.options.runtimeConfig.public.web3kit = defu(
      nuxt.options.runtimeConfig.public.web3kit,
      {
        vagmi: options.vagmi,
        cookies: options.cookies,
        routes: options.routes,
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
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, "plugins", "vagmi"));
    addPlugin(resolve(runtimeDir, "plugins", "middleware"));

    // Add server api
    const serverAPI = resolve(runtimeDir, "server", "api");

    addServerHandler({
      route: publicConfig.routes.signin,
      handler: resolve(serverAPI, "signin"),
    })

    addServerHandler({
      route: publicConfig.routes.signout,
      handler: resolve(serverAPI, "signout"),
    });

    addServerHandler({
      route: publicConfig.routes.storage + "/store",
      handler: resolve(serverAPI, "storage", "store"),
    });

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, "server", "middleware", "signedin"),
    });

    // Add runtime/composables to imports
    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
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
      '@wagmi/core', 
      "remove-accents",
      "eventemitter3",
    );
  },
});
