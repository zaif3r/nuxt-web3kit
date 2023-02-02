import type { Address, SignMessageArgs, SignTypedDataArgs } from "@wagmi/core";
import { utils } from "ethers";

export interface SignInArgs {
  signer: Address;
  signature: Parameters<typeof utils.verifyTypedData>[3];
  args?: SignTypedDataArgs;
  message?: SignMessageArgs["message"];
  payload: SignInPayload;
}

export type SignInResult = {
  token: string;
};

export type SignInPayload = { [key: string]: any } & {
  address: Address;
};
