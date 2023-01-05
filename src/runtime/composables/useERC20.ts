import { useContract } from "./useContract";
import { erc20ABI } from "vagmi";

export function useERC20({
  address,
  signerOptions,
}: Parameters<typeof useContract>[0]) {
  return useContract({
    address,
    signerOptions,
    abi: erc20ABI,
  });
}
