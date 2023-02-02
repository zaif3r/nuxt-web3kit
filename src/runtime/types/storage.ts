import type { PutOptions } from "web3.storage";

export interface StorageArgs {
  files: (FileData | JsonFileData)[];
  options?: StorageArgsOptions;
}

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

export type StorageArgsOptions = Omit<
  PutOptions,
  "signal" | "onStoredChunk" | "onRootCidReady"
>;

export type StorageResult = {
  cid: string;
};
