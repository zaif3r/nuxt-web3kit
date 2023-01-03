import { configureChains } from "vagmi";
import { infuraProvider } from "vagmi/providers/infura";
import { alchemyProvider } from "vagmi/providers/alchemy";
import { jsonRpcProvider } from "vagmi/providers/jsonRpc";
import { publicProvider } from "vagmi/providers/public";
import { InjectedConnector } from "vagmi/connectors/injected";
import { MetaMaskConnector } from "vagmi/connectors/metaMask";
import { WalletConnectConnector } from "vagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "vagmi/connectors/coinbaseWallet";

export type VagmiProvider = Exclude<
  Parameters<
    | typeof infuraProvider
    | typeof alchemyProvider
    | typeof jsonRpcProvider
    | typeof publicProvider
  >[0],
  undefined
>;

export type VagmiConnector = {
  name?: "injected" | "metamask" | "walletConnect" | "coinbaseWallet";
  options: Exclude<
    ConstructorParameters<
      | typeof InjectedConnector
      | typeof MetaMaskConnector
      | typeof WalletConnectConnector
      | typeof CoinbaseWalletConnector
    >[0],
    undefined
  >;
};

export type VagmiConfigureChainsOptions = Parameters<typeof configureChains>[2];
