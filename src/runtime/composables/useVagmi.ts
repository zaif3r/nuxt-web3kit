import { useNuxtApp } from "#imports";
import { Chain, ChainProviderFn, Client, Connector } from "vagmi";

interface VagmiState {
  client: Client<any, any>;
  chains: Chain[];
  providers: ChainProviderFn[];
  connectors: Connector[];
}

export function useVagmi() {
  const vagmi = useNuxtApp().vagmi as VagmiState;

  function setState(vagmi: VagmiState) {
    useNuxtApp().vagmi = vagmi;
  }

  return {
    ...vagmi,
    setState,
  };
}
