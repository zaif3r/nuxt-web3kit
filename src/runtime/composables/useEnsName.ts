import { useEnsName as useVagmiEnsName } from "vagmi";

export function useEnsAddress(options: Parameters<typeof useVagmiEnsName>[0]) {
  const ensName = useVagmiEnsName(options);

  return ensName;
}
