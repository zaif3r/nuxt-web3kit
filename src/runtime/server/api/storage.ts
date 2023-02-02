import { useRuntimeConfig } from "#imports";
import {
  defineEventHandler,
  assertMethod,
  createError,
  readBody,
  getCookie,
} from "h3";
import { Web3Storage } from "web3.storage";

import type { StorageArgs, StorageResult } from "../../types/storage";

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const { token } = useRuntimeConfig().web3kit.storage;
  const { cookies } = useRuntimeConfig().public.web3kit;

  const signinCookie = getCookie(event, cookies.signIn);
  if (!signinCookie) {
    return createError({
      statusCode: 403,
      message: "Not signed in",
    });
  }

  const body = await readBody<StorageArgs>(event);
  if (!body.files || body.files.length == 0) {
    return createError({
      statusCode: 400,
      message: "No files to store",
    });
  }

  const files: File[] = [];
  const storage = new Web3Storage({ token });

  for (const fileData of body.files) {
    if (typeof fileData.data == "string") {
      const blob = (await $fetch(fileData.data)) as any;
      files.push(
        new File([blob], fileData.name, {
          type: fileData.type,
        })
      );
    } else if (fileData.type == "application/json") {
      const jsonBlob = new Blob([JSON.stringify(fileData.data)], {
        type: fileData.type,
      });
      files.push(new File([jsonBlob], fileData.name));
    } else {
      // TODO - handle other types
    }
  }

  if (files.length == 0) {
    return createError({
      statusCode: 400,
      message: "No files to store",
    });
  }

  const cid = await storage.put(files, body.options);
  return <StorageResult>{ cid };
});
