import { useAsyncData } from "#imports";
import { BytesLike, Contract, ContractFactory, ContractInterface } from "ethers";
import { useSigner } from "vagmi";
import { ref, toRaw } from "vue";

export interface useDeployContractArgs {
  abi: ContractInterface;
  bytecode: BytesLike;
  signerOptions: Parameters<typeof useSigner>[0];
}

export function useDeployContract({
  abi,
  bytecode,
  signerOptions,
}: useDeployContractArgs) {
  const args = ref<any[]>([]);

  const signer = useSigner(signerOptions);

  const deployData = useAsyncData(async () => {
    if (!signer.data.value) {
        throw new Error("Signer not available");
    }

    const factory = new ContractFactory(
        abi,
        bytecode,
        toRaw(signer.data.value)
    );

    return await factory.deploy(...toRaw(args.value));
  }, {
    lazy: true,
    immediate: false,
  });

  async function deploy(...deployArgs: any[]) {
    args.value = deployArgs;
    await deployData.execute();
  }

  return {
    ...deployData,
    contract: deployData.data,
    deploy,
  };
}
