import type { FetchSignerArgs } from "@wagmi/core";
import type { TransactionRequest } from "@ethersproject/abstract-provider";
import type { BytesLike, ContractInterface } from "ethers";

export type DeployContractArgs = FetchSignerArgs & {
  abi: ContractInterface;
  bytecode: BytesLike;
  args: any[];
};

export type PrepareDeployContractResult = DeployContractArgs & {
  request: TransactionRequest;
};
