import { useSignTypedData } from "vagmi";

export type SigninArgs = Exclude<
  Parameters<ReturnType<typeof useSignTypedData>["signTypedDataAsync"]>[0],
  undefined
>;

export interface SigninBody {
  signer: string;
  signature: string;
  typedData: SigninArgs;
  payload: SigninPayload;
}

export type SigninPayload = { [key: string]: any } & {
  address: string;
};
