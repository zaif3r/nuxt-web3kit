import { useRuntimeConfig } from "#imports";
import { defineEventHandler, assertMethod, readBody, createError } from "h3";
import { Web3Storage } from "web3.storage";
import { StoreBody } from "../../../types/storage";

export default defineEventHandler(async (event) => {
    assertMethod(event, "POST");
    
    const { web3kit: { storage: config } } = useRuntimeConfig();

    const body = await readBody<StoreBody>(event);

    if (!body.files || !body.files.length) {
        return createError({
            status: 400,
            message: "No files to store",
        });
    }

    const storage = new Web3Storage({ token: config.token });

    let files: File[] = [];

    for (const fileData of body.files) {
        if ("type" in fileData) {
            const blob = await $fetch(fileData.data) as any;

            files.push(new File([blob], fileData.name, {
                type: fileData.type,
            }))
        } else {
            const jsonBlob = new Blob([JSON.stringify(fileData.data)], {
                type: "application/json",
            });

            files.push(new File([jsonBlob], fileData.name));
        }
    }

    const cid = await storage.put(files, body.options);

    return {
        cid,
    };
});
