import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { configureChains, createClient, VagmiPlugin, defaultChains } from "vagmi";
import { infuraProvider } from "vagmi/providers/infura";
import { alchemyProvider } from "vagmi/providers/alchemy";
import { jsonRpcProvider } from "vagmi/providers/jsonRpc";
import { publicProvider } from "vagmi/providers/public";
import { InjectedConnector } from "vagmi/connectors/injected";
import { MetaMaskConnector } from "vagmi/connectors/metaMask";
import { WalletConnectConnector } from "vagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "vagmi/connectors/coinbaseWallet";
import { useVagmi } from "../composables/useVagmi";
import { VagmiConnector, VagmiProvider } from "../types/vagmi";

export default defineNuxtPlugin((nuxtApp) => {
  const { web3kit: { vagmi: config } } = useRuntimeConfig().public;

  let providers, connectors;

  if (config.providers) {
    providers = config.providers.map((provider: VagmiProvider) => {
      if ("infuraId" in provider) {
        return infuraProvider(provider);
      } else if ("alchemyId" in provider) {
        return alchemyProvider(provider);
      } else if ("rpc" in provider) {
        return jsonRpcProvider(provider);
      } else {
        return publicProvider(provider);
      }
    });
  } else {
    providers = [publicProvider()];
  }

  const chainsConfig = config.chains || defaultChains;

  if (config.connectors) {
    connectors = config.connectors.map((connector: VagmiConnector) => {
      const connectorOptions = {
        chains: chainsConfig,
        options: connector.options
      }

      if (connector.name === "metamask") {
        return new MetaMaskConnector(connectorOptions as any);
      } else if (connector.name === "walletConnect") {
        return new WalletConnectConnector(connectorOptions as any);
      } else if (connector.name === "coinbaseWallet") {
        return new CoinbaseWalletConnector(connectorOptions as any);
      } else {
        return new InjectedConnector(connectorOptions as any);
      }
    });
  } else {
    connectors = [new InjectedConnector({
      chains: chainsConfig,
    })];
  }

  const { chains, provider, webSocketProvider } = configureChains(
    chainsConfig,
    providers,
    config.config
  );

  const client = createClient({
    connectors,
    provider,
    webSocketProvider,
    autoConnect: config.autoConnect,
  });

  nuxtApp.vueApp.use(VagmiPlugin(client));

  const vagmi = useVagmi();

  vagmi.setState({
    client,
    chains,
    providers,
    connectors: client.connectors,
  });
});
