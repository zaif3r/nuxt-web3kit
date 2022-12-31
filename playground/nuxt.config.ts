import { defineNuxtConfig } from "nuxt/config";
import Web3Kit from "..";

export default defineNuxtConfig({
  modules: [Web3Kit],
  web3kit: {
    vagmi: {
      autoConnect: true,
    }
  },
});
