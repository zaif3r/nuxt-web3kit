import { useState } from "#app";
import { computed } from "vue";

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

  function setState(vagmiAccount: VagmiAccount | null) {
    if (!vagmiAccount) {
      return (account.value = null);
    }

    account.value = vagmiAccount;
  }

  return {
    account: computed(() => account.value),
    setState,
  };
}
