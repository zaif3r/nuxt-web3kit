import type { QueryOptions, UseAsyncQueryResult } from "@zaifer/nuxt-query";
import { useRuntimeConfig, useAsyncQuery } from "#imports";
import { disconnect } from "@wagmi/core";

import { useAccountStore } from "../../store/account";
import { useClientStore } from "../../store/client";

export type UseSignOutOptions = QueryOptions<{}, string>;

export function useSignOut(options?: UseSignOutOptions): UseAsyncQueryResult<{}, string> {
  const { routes } = useRuntimeConfig().public.web3kit;

  const clientStore = useClientStore();
  const accountStore = useAccountStore();

  return useAsyncQuery({
    key: "useSignOut",
    asyncFn: async () => {
      await disconnect();

      const result = await $fetch<string>(routes.signOut);

      accountStore.$clear();
      clientStore.$disconnect();

      return result;
    },
    options: {
      server: false,
      immediate: false,
      ...options,
    },
  });
}
