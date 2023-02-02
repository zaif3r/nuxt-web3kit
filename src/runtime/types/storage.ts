import type { PutOptions } from "web3.storage";

export type FetchStorageArgs = { cid: string; fileName: string };

export type FetchStorageResult<T> = { url: string; data: T };

export interface StorageServerArgs {
  files: (FileData | JsonFileData)[];
  options?: StorageServerArgsOptions;
}

export interface StorageServerResult {
  cid: string;
}

export type StorageServerArgsOptions = Omit<
  PutOptions,
  "signal" | "onStoredChunk" | "onRootCidReady"
>;

export interface FileData {
  name: string;
  type: string;
  data: string;
}

export interface JsonFileData {
  name: string;
  type: "application/json";
  data: Record<string, any>;
}
