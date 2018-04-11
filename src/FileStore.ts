import * as fsNode from "fs";
import * as mkdirpOrg from "mkdirp";
import * as path from "path";
import * as util from "util";
import { IStore, Store } from "./Store";

const fs = {
  readFile: util.promisify(fsNode.readFile),
  stat: util.promisify(fsNode.stat),
  writeFile: util.promisify(fsNode.writeFile)
};

const mkdirp = util.promisify(mkdirpOrg);

export class FileStore extends Store implements IStore {
  private encoder = JSON.stringify;
  private decoder = JSON.parse;
  private encoding = "utf8";

  constructor() {
    super();
  }

  public async save(
    rootDir: string,
    filename: string,
    data: any
  ): Promise<string> {
    const fullPath = this.getFullPath(rootDir, filename);
    const dirPath = this.getDirPath(fullPath);
    const dirExist = await this.isDirExist(dirPath);
    if (!dirExist) {
      await this.mkdirp(dirPath);
    }
    await this.writeToFile(fullPath, data);
    return fullPath;
  }

  public async has(fullPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(fullPath);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async get(rootDir: string, filename: string): Promise<any> {
    const fullPath = this.getFullPath(rootDir, filename);
    const data = await this.readFromFile(fullPath);
    return this.decoder(data);
  }

  private getFullPath(rootDir: string, filePath: string): string {
    return path.resolve(process.cwd(), rootDir, filePath);
  }

  private getDirPath(fullPath: string): string {
    return path.dirname(fullPath);
  }

  private async isDirExist(dirPath: string): Promise<boolean> {
    let stat: fsNode.Stats;
    try {
      stat = await fs.stat(dirPath);
    } catch (err) {
      return false;
    }
    if (!stat.isDirectory()) {
      throw new Error(
        `Path - ${dirPath} - already exist, but not a Directory.`
      );
    }

    return true;
  }

  private async mkdirp(dirPath: string): Promise<void> {
    await mkdirp(dirPath);
  }

  private async writeToFile(fullPath: string, data: any) {
    await fs.writeFile(fullPath, this.encoder(data));
  }

  private async readFromFile(fullPath: string): Promise<string> {
    return await fs.readFile(fullPath, this.encoding);
  }
}
