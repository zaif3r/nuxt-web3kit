import { Client } from "@wagmi/core";
import { useNuxtApp } from "#imports";

export function useClient(): Client<any, any> {
  return useNuxtApp().$wagmi;
}
