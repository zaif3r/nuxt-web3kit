import { InfuraProviderConfig } from "@wagmi/core/providers/infura";
import { AlchemyProviderConfig } from "@wagmi/core/providers/alchemy";
import { JsonRpcProviderConfig } from "@wagmi/core/providers/jsonRpc";
import { PublicProviderConfig } from "@wagmi/core/providers/public";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";

export type ProviderKey = "infura" | "alchemy" | "jsonRpc" | "public";

export type ConnectorKey =
  | "injected"
  | "metamask"
  | "walletConnect"
  | "coinbaseWallet";

export type Provider<T extends ProviderKey = ProviderKey> = (T extends "infura"
  ? InfuraProviderConfig
  : T extends "alchemy"
  ? AlchemyProviderConfig
  : T extends "jsonRpc"
  ? JsonRpcProviderConfig
  : T extends "public"
  ? PublicProviderConfig
  : never) & {
  key: T;
};

export type Connector<T extends ConnectorKey = ConnectorKey> =
  (T extends "injected"
    ? NonNullable<ConstructorParameters<typeof InjectedConnector>[0]>["options"]
    : T extends "metamask"
    ? NonNullable<ConstructorParameters<typeof MetaMaskConnector>[0]>["options"]
    : T extends "walletConnect"
    ? ConstructorParameters<typeof WalletConnectConnector>[0]["options"]
    : T extends "coinbaseWallet"
    ? ConstructorParameters<typeof CoinbaseWalletConnector>[0]["options"]
    : never) & {
    key: T;
  };
