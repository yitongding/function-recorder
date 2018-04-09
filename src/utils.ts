import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as util from "util";

const mkdirPr = util.promisify(mkdirp);
const fsPr = {
  stat: util.promisify(fs.stat)
};

export const isDirExist = async (path: string) => {
  let stats: fs.Stats;

  try {
    stats = await fsPr.stat(path);
  } catch (err) {
    return false;
  }

  if (!stats.isDirectory()) {
    throw new Error(`Path ${path} already exist, but not a directory`);
  }

  return true;
};

export const mkdir = async (
  path: string,
  option?: { mode?: number | string },
) => {
  return mkdirPr(path, option.mode);
};

export const md5HashFilename = (args: any[]): string => {
  return "123";
};
