import {
  useSignMessage,
  useSignTypedData,
  useSigner as useVagmiSigner,
} from "vagmi";

export function useSigner() {
  const { data: signer } = useVagmiSigner();
  const { signMessageAsync } = useSignMessage();
  const { signTypedDataAsync } = useSignTypedData();

  return {
    signer,
    signMessage: signMessageAsync,
    signTypedData: signTypedDataAsync,
  };
}
