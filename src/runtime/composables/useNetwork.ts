import { useNetwork as useVagmiNetwork, useSwitchNetwork } from "vagmi";

export function useNetwork() {
  const { chain, chains } = useVagmiNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return {
    chain,
    chains,
    switchNetwork,
  };
}
