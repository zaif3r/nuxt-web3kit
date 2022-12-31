import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export interface ModuleOptions {
  addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@zaifer/nuxt-web3kit",
    configKey: "web3kit",
  },
  defaults: {
    addPlugin: true,
  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, "plugin"));
    }
  },
});
