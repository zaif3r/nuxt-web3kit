import type { Chain } from "@wagmi/core";
import type { Connector, Provider } from "./wagmi";
import type { SignOptions } from "jsonwebtoken";

export interface WagmiConfig {
  autoConnect: boolean;
  chains: Chain[];
  providers: Provider[];
  connectors: Connector[];
  fallbackProvider: boolean;
}

export interface ServerConfig {
  routes: {
    signIn: string;
    signOut: string;
    storage: string;
  };
  cookies: {
    signIn: string;
  };
  jwt: {
    secret: string;
    options?: SignOptions;
  };
  storage: {
    token: string;
  };
}
