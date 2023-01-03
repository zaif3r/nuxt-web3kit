import { useRuntimeConfig } from "#imports";
import { defineEventHandler, readBody, createError, getCookie, setCookie } from "h3";
import { SigninBody, SigninPayload } from "../../types/signin";
import jwt from "jsonwebtoken";
import { utils } from "ethers";

export default defineEventHandler(async (event) => {
  const { web3kit: { cookies } } = useRuntimeConfig().public;

  const connectionCookie = getCookie(event, cookies.connection);

  if (!connectionCookie) {
    return createError({
      status: 403,
      message: "Not connected",
    });
  }

  const body = await readBody<SigninBody>(event);

  const signer = utils.verifyTypedData(
    body.typedData.domain,
    body.typedData.types,
    body.typedData.value,
    body.signature
  );

  if (signer !== body.signer) {
    return createError({
      status: 403,
      message: "Invalid signature",
    });
  }

  const token = jwtSignin(body.payload);
  setCookie(event, cookies.signin, token)

  return "Signed in"
});

function jwtSignin(payload: SigninPayload) {
  const { web3kit: { jwt: jwtConfig } } = useRuntimeConfig();

  return jwt.sign(payload, jwtConfig.secret, jwtConfig.options);
}
