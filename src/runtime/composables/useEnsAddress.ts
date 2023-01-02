import { useEnsAddress as useVagmiEnsAddress } from "vagmi";

export function useEnsAddress(options: Parameters<typeof useVagmiEnsAddress>[0]) {
  const ensAddress = useVagmiEnsAddress(options);

  return ensAddress;
}
