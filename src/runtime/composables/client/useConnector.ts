import type { ComputedRef } from "vue";
import type { Connector } from "@wagmi/core";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useClientStore } from "../../store/client";
import { useClient } from "./useClient";

export function useConnector(): ComputedRef<Connector | undefined> {
  const client = useClient();

  const { connectorId } = storeToRefs(useClientStore());

  return computed(() =>
    client.connectors.find((c) => c.id == connectorId.value)
  );
}
