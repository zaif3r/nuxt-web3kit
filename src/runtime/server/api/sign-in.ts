import { useRuntimeConfig } from "#imports";
import {
  defineEventHandler,
  assertMethod,
  createError,
  readBody,
  setCookie,
} from "h3";
import { utils } from "ethers";
import jwt from "jsonwebtoken";

import type { SignInArgs, SignInResult } from "../../types/sign-in";

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const { jwt: config } = useRuntimeConfig().web3kit;
  const { cookies } = useRuntimeConfig().public.web3kit;

  let signer: string | undefined;
  const body = await readBody<SignInArgs>(event);

  if (body.message) {
    signer = utils.verifyMessage(body.message, body.signature);
  } else if (body.args) {
    signer = utils.verifyTypedData(
      body.args.domain,
      body.args.types,
      body.args.value,
      body.signature
    );
  }

  if (signer != body.signer) {
    return createError({
      status: 403,
      message: "Invalid signature",
    });
  }

  const token = jwt.sign(body.payload, config.secret, config.options);
  setCookie(event, cookies.signIn, token);

  return <SignInResult>{ token };
});
