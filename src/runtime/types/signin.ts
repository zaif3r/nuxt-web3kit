import { useSignTypedData } from "vagmi";

export type SigninTypedData = Exclude<
  Parameters<ReturnType<typeof useSignTypedData>["signTypedDataAsync"]>[0],
  undefined
>;

export interface SigninBody {
  signer: string;
  signature: string;
  typedData: SigninTypedData;
  payload: SigninPayload;
}

export type SigninPayload = { [key: string]: any } & {
  address: string;
};
