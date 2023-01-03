import { PutOptions } from "web3.storage";

export interface FileData {
  name: string;
  type: string;
  data: string;
}

export interface JsonFileData {
  name: string;
  data: Record<string, any>;
}

export interface StoreBody {
  files: (FileData | JsonFileData)[];
  options?: StoreBodyOptions;
}

export type StoreBodyOptions = Omit<
  PutOptions,
  "signal" | "onStoredChunk" | "onRootCidReady"
>;

export type StoreResult = {
  cid: string;
}

export type RetrieveQuery = {
  cid: string;
  filename?: string;
};
