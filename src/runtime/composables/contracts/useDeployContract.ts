import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { Contract, ContractFactory } from "ethers";
import { get } from "@vueuse/core";
import { toRaw, computed } from "vue";
import { useAsyncQuery } from "#imports";

import type { DeployContractArgs } from "../../types/contract";
import { useSigner } from "../accounts/useSigner";

export type UseDeployContractArgs = UseQueryArgs<DeployContractArgs>;

export type UseDeployContractOptions = QueryOptions<
  DeployContractArgs,
  Contract
>;

export function useDeployContract(
  args?: UseDeployContractArgs,
  options?: UseDeployContractOptions
) {
  const signerArgs = computed(() => ({
    chainId: get(get(args)?.chainId),
  }));

  const { data: signer } = useSigner(signerArgs);

  return useAsyncQuery({
    key: "useDeployContract",
    args,
    options: {
      server: false,
      immediate: false,
      required: ["abi", "bytecode"],
      ...options,
    },
    asyncFn: async ({ abi, bytecode, args }) => {
      if (!signer.value) {
        throw new Error("Signer not available");
      }

      const factory = new ContractFactory(abi, bytecode, toRaw(signer.value));

      return await factory.deploy(...args);
    },
  });
}
