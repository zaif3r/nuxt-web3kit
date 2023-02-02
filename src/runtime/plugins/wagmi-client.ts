import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { createClient, configureChains } from "@wagmi/core";
import { toRaw } from "vue";

import { infuraProvider } from "@wagmi/core/providers/infura";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";

import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";

import type { WagmiConfig } from "../types/config";

export default defineNuxtPlugin(async () => {
  const { web3kit } = useRuntimeConfig().public;
  const config = web3kit as WagmiConfig;

  const providers = getProviders(config);
  const connectors = getConnectors(config);

  const defaultChains = toRaw(config.chains);

  const { provider, webSocketProvider } = configureChains(
    defaultChains,
    providers
  );

  const wagmi = createClient({
    connectors,
    provider,
    webSocketProvider,
    autoConnect: false,
  });

  return {
    provide: {
      wagmi,
      providers,
      connectors,
    },
  };
});

function getProviders(config: WagmiConfig) {
  if (config.providers) {
    const configProviders = config.providers.map((provider) => {
      if (provider.name === "infura") {
        return infuraProvider(provider as any);
      } else if (provider.name == "alchemy") {
        return alchemyProvider(provider as any);
      } else if (provider.name == "jsonRpc") {
        return jsonRpcProvider(provider as any);
      } else {
        return publicProvider(provider as any);
      }
    });
    if (config.fallbackProvider) {
      configProviders.push(publicProvider());
    }
    return configProviders;
  } else {
    return [publicProvider()];
  }
}

function getConnectors(
  config: WagmiConfig
): (
  | MetaMaskConnector
  | WalletConnectConnector
  | CoinbaseWalletConnector
  | InjectedConnector
)[] {
  const defaultChains = toRaw(config.chains);

  if (config.connectors) {
    return config.connectors.map((connector) => {
      const connectorOptions = {
        chains: defaultChains,
        options: connector,
      } as any;

      if (connector.name === "metamask") {
        return new MetaMaskConnector(connectorOptions);
      } else if (connector.name === "walletConnect") {
        return new WalletConnectConnector(connectorOptions);
      } else if (connector.name === "coinbaseWallet") {
        return new CoinbaseWalletConnector(connectorOptions);
      } else {
        return new InjectedConnector(connectorOptions);
      }
    });
  } else {
    return [
      new InjectedConnector({
        chains: defaultChains,
      }),
    ];
  }
}
