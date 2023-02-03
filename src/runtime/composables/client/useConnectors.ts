import type { ComputedRef } from "vue";
import type { Connector } from "@wagmi/core";
import { computed } from "vue";
import { useNuxtApp } from "#imports";

export function useConnectors(): ComputedRef<Connector[]> {
  const connectors = useNuxtApp().$connectors;
  return computed(() => connectors);
}
