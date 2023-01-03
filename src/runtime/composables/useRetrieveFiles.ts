import { Ref, ComputedRef } from "vue";

export function useRetrieveFiles(
  cid: string | Ref<string | undefined> | ComputedRef<string | undefined>
) {
  const baseUrl = computed(() => {
    if (typeof cid === "string") return `https://${cid}.ipfs.w3s.link/`;
    else if (isRef(cid)) {
      return cid.value ? `https://${cid.value}.ipfs.w3s.link/` : null;
    }
  });

  function fileUrl(fileName: string) {
    return baseUrl.value + fileName;
  }

  async function fetchFiles(fileName?: string) {
    const url = baseUrl.value + (fileName ? fileName : "");
    return await $fetch(url, {
      method: "GET",
    });
  }

  return {
    baseUrl,
    fileUrl,
    fetchFiles,
  };
}
