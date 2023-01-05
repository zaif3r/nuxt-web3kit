import { useContract } from "./useContract";
import { erc721ABI } from "vagmi";

export function useERC721({
  address,
  signerOptions,
}: Parameters<typeof useContract>[0]) {
  return useContract({
    address,
    signerOptions,
    abi: erc721ABI,
  });
}
