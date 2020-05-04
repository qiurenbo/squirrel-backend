import * as crypto from "crypto";

const cryptoPassword = (password: string) => {
  return crypto
    .createHmac("sha256", process.env.CRYPRTO_KEY)
    .update(password)
    .digest("base64");
};

export { cryptoPassword };
