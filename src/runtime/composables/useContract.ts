import { Contract, ContractInterface } from "ethers";
import { useSigner } from "vagmi";
import { Ref, ComputedRef, ref, computed, toRaw, isRef, watch } from "vue";

export interface UseContractOptions {
  address: string | Ref<string | undefined> | ComputedRef<string | undefined>;
  abi: ContractInterface;
  signerOptions: Parameters<typeof useSigner>[0];
}

export function useContract({ address, abi, signerOptions }: UseContractOptions) {
  const contract = ref<Contract | null>(null);

  const contractAddress = computed(() => {
    if (isRef(address)) {
      return address.value;
    }
    return address;
  })

  const signer = useSigner(signerOptions);

  watch(signer.data, () => {
    if (signer.data.value && contractAddress.value) {
      contract.value = new Contract(contractAddress.value, abi, toRaw(signer.data.value));
    }
  });

  return {
    ...signer,
    contract,
  };
}
