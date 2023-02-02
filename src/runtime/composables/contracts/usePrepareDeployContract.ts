import type { QueryOptions, UseQueryArgs } from "@zaifer/nuxt-query";
import { ContractFactory } from "ethers";
import { get } from "@vueuse/core";
import { toRaw, computed } from "vue";
import { useAsyncQuery } from "#imports";

import type {
  DeployContractArgs,
  PrepareDeployContractResult,
} from "../../types/contract";
import { useSigner } from "../accounts/useSigner";

export type UsePrepareDeployContractArgs = UseQueryArgs<DeployContractArgs>;

export type UsePrepareDeployContractOptions = QueryOptions<
  DeployContractArgs,
  PrepareDeployContractResult
>;

export function usePrepareDeployContract(
  args?: UsePrepareDeployContractArgs,
  options?: UsePrepareDeployContractOptions
) {
  const signerArgs = computed(() => ({
    chainId: get(get(args)?.chainId),
  }));

  const { data: signer } = useSigner(signerArgs);

  return useAsyncQuery({
    key: "usePrepareDeployContract",
    args,
    options: {
      server: false,
      immediate: false,
      required: ["abi", "bytecode"],
      ...options,
    },
    asyncFn: async ({ abi, bytecode, args, chainId }) => {
      if (!signer.value) {
        throw new Error("Signer not available");
      }

      const factory = new ContractFactory(abi, bytecode, toRaw(signer.value));

      const request = await signer.value.populateTransaction(
        factory.getDeployTransaction(...args)
      );

      return {
        abi,
        bytecode,
        args,
        chainId,
        request: request,
      };
    },
  });
}
