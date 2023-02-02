import {
  mainnet,
  arbitrum,
  optimism,
  polygon,
  bsc,
  avalanche,
  fantom,
  gnosis,
  zkSync,
  evmos,
} from "@wagmi/core/chains";

const defaultChains = [
  mainnet,
  arbitrum,
  optimism,
  polygon,
  bsc,
  avalanche,
  fantom,
  gnosis,
  zkSync,
  evmos,
];

export default defineNuxtConfig({
  modules: ["../src/module"],
  imports: {
    autoImport: true,
  },
  web3kit: {
    autoConnect: true,
    fallbackProvider: true,
    chains: defaultChains,
    providers: [
      {
        key: "jsonRpc",
        weight: 2,
        priority: 0,
        rpc: (chain: any) => {
          if (chain.id == mainnet.id) {
            return {
              http: "https://eth.llamarpc.com",
            };
          }
          if (chain.id == polygon.id) {
            return {
              http: "https://polygon.llamarpc.com",
            };
          }
          return null;
        },
      },
    ],
    connectors: [
      {
        key: "metamask",
        shimChainChangedDisconnect: false,
      },
      {
        key: "walletConnect",
        qrcode: true,
      },
      {
        key: "injected",
        name: "Injected",
      },
    ],
  },
});
