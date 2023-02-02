import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useClientStore } from "../../store/client";
import { useClient } from "./useClient";

export function useConnector() {
  const client = useClient();

  const { connectorId } = storeToRefs(useClientStore());

  return computed(() =>
    client.connectors.find((c) => c.id == connectorId.value)
  );
}
