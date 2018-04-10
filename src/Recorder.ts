import * as path from "path";
import { IStore } from "./Store";
import { md5HashFilename } from "./utils";

export type IPathFunc = (args: any[]) => string;
export type IFileMode = number | string | null;

export interface IRecorderOptions {
  rootPath: string;
  store: IStore;
  pathFunc?: IPathFunc;
  fileMode?: IFileMode;
}

export interface IRecorder {
  decorate: MethodDecorator;
  wrap<T extends Function>(srcFunc: T): T;
}

export abstract class Recorder implements IRecorder {
  protected fileMode: IFileMode;
  protected pathFunc: IPathFunc;
  protected rootPath: string;
  protected store: IStore;

  constructor(options: IRecorderOptions) {
    this.rootPath = options.rootPath;
    this.store = options.store;

    this.fileMode = options.fileMode || null;
    this.pathFunc = options.pathFunc || md5HashFilename;
  }

  public abstract wrap<T extends Function>(srcFunc: T): T;
  public abstract decorate(
    target: any,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor
  ): PropertyDescriptor | undefined;

  protected getStoreKey(args: any[]): string {
    return this.pathFunc(args);
  }
}
