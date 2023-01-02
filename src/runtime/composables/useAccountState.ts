import { useState } from "#app";
import { useAccount as useVagmiAccount } from "vagmi";

export const AccountStateKey = "web3kit.account" as const;

export interface VagmiAccount {
  address?: string;
  isConnected?: boolean;
  isConnecting?: boolean;
  isReconnecting?: boolean;
  isDisconnected?: boolean;
  status?: string;
}

export function useAccountState() {
  const account = useState<VagmiAccount | null>(AccountStateKey, () => null);

  function setState(vagmiAccount: ReturnType<typeof useVagmiAccount> | null) {
    if (!vagmiAccount) {
      return (account.value = null);
    }

    account.value = {
      address: vagmiAccount.address.value,
      isConnected: vagmiAccount.isConnected.value,
      isConnecting: vagmiAccount.isConnecting.value,
      isReconnecting: vagmiAccount.isReconnecting.value,
      isDisconnected: vagmiAccount.isDisconnected.value,
      status: vagmiAccount.status.value,
    };
  }

  return {
    account,
    setState,
  };
}
