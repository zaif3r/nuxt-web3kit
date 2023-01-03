import { useFetch, useRuntimeConfig } from "#app";
import { ref, toRaw } from "vue";
import { StoreBody, StoreBodyOptions, StoreResult } from "../types/storage";

export function useStoreFiles(options?: StoreBodyOptions) {
  const { web3kit: { routes } } = useRuntimeConfig().public;

  const storeBody = ref<StoreBody | null>(null);

  const fetchStore = useFetch<StoreResult>(routes.storage + "/store", {
    method: "POST",
    immediate: false,
    body: toRaw(storeBody),
    watch: [storeBody],
  });

  async function storeFiles(files: StoreBody["files"]) {
    storeBody.value = {
      files,
      options,
    };

    await fetchStore.execute();
  }

  return {
    ...fetchStore,
    storeFiles,
  };
}
