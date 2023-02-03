import type { ConnectArgs, Connector, ConnectResult } from "@wagmi/core";
import type { QueryOptions, UseAsyncQueryResult, UseQueryArgs } from "@zaifer/nuxt-query";
import type { ComputedRef } from "vue";
import { useAsyncQuery } from "#imports";
import { connect } from "@wagmi/core";
import { storeToRefs } from "pinia";
import { get } from "@vueuse/core";
import { computed } from "vue";

import { useAccountStore } from "../../store/account";
import { useConnector } from "../client/useConnector";

export type UseConnectArgs = UseQueryArgs<ConnectArgs>;

export type UseConnectOptions = QueryOptions<ConnectArgs, ConnectResult | true>;

export type UseConnectResult = UseAsyncQueryResult<ConnectArgs, ConnectResult | true> & {
  pendingConnector: ComputedRef<Connector | undefined>;
}

export function useConnect(
  args?: UseConnectArgs,
  options?: UseConnectOptions
): UseConnectResult {
  const { status } = storeToRefs(useAccountStore());
  const activeConnector = useConnector();

  const connectArgs = computed(() => {
    const defaultArgs = get(args);
    return {
      chainId: get(defaultArgs?.chainId),
      connector: get(defaultArgs?.connector) ?? activeConnector.value,
    };
  });

  const query = useAsyncQuery<ConnectArgs, ConnectResult | true>({
    key: "useConnect",
    args: connectArgs,
    options: {
      server: false,
      immediate: false,
      required: ["connector"],
      ...options,
    },
    asyncFn: async (args) => {
      if (status.value == "connected") {
        if (args.connector.id == activeConnector.value?.id) {
          return true;
        }
      }
      return await connect(args);
    },
  });

  const pendingConnector = computed(() =>
    query.pending.value ? query.args.value.connector : undefined
  );

  return {
    ...query,
    pendingConnector,
  };
}
