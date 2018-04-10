import * as crypto from "crypto";

export const md5HashFilename = (args: any[]): string => {
  const str = JSON.stringify(args);

  const md5Hash = crypto
    .createHash("md5")
    .update(str)
    .digest("hex");

  return md5Hash;
};
