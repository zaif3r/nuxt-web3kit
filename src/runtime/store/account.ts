import type { Address, GetAccountResult } from "@wagmi/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore(
  "web3kit-account",
  () => {
    const address = ref<Address | undefined>();
    const status = ref<GetAccountResult["status"] | undefined>();

    function $update(data: GetAccountResult) {
      address.value = data.address;
      status.value = data.status;
    }

    function $clear() {
      address.value = undefined;
      status.value = undefined;
    }

    return {
      address,
      status,
      $update,
      $clear,
    };
  },
  {
    persist: true,
  }
);
