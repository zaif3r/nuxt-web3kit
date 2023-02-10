import type { UseQueryArgs as UseAsyncQueryArgs } from "@zaifer/nuxt-query";

export type UseQueryArgs<TArgs extends object> = UseAsyncQueryArgs<TArgs> & {
  key?: string;
};
