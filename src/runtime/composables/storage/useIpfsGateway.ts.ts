import type { UseQueryArgs } from "@zaifer/nuxt-query";
import { computed } from "vue";
import { get } from "@vueuse/core";

import type { FetchStorageArgs } from "../../types/storage";

export type UseResolveCIDArgs = UseQueryArgs<FetchStorageArgs>;

export function useIpfsGateway(args: UseResolveCIDArgs = {}) {
  function resolve(cid?: string, fileName?: string) {
    const base = cid ? `https://${cid}.ipfs.w3s.link` : undefined;
    return base ? `${base}/${fileName}` : undefined;
  }

  return {
    url: computed(() => {
      return resolve(get(get(args).cid), get(get(args).fileName));
    }),
    resolve,
  };
}
