import * as path from "path";
import { IStore } from "./Store";
import { IPathFunc } from "./types";
import { md5HashFilename } from "./utils";

export interface IRepeaterOptions {
  rootPath: string;
  store: IStore;
  pathFunc?: IPathFunc;
}

export interface IRepeater {
  decorate: MethodDecorator;
  wrap<T extends Function>(srcFunc: T): T;
}

export abstract class Repeater implements IRepeater {
  protected pathFunc: IPathFunc;
  protected rootPath: string;
  protected store: IStore;

  constructor(options: IRepeaterOptions) {
    this.rootPath = options.rootPath;
    this.store = options.store;

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
