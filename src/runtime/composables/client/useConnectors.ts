import { computed } from "vue";
import { useNuxtApp } from "#imports";

export function useConnectors() {
  const connectors = useNuxtApp().$connectors;
  return computed(() => connectors);
}
