import * as path from "path";
import {
  IFileMode,
  IFunctionRecorder,
  IOptions,
  IPathFunc,
  ISrcFunc,
} from "./types";
import { md5HashFilename } from "./utils";

export abstract class FunctionRecorder implements IFunctionRecorder {
  private rootPath: string;
  private pathFunc: IPathFunc;
  private fileMode: IFileMode;

  constructor(options: IOptions) {
    this.rootPath = options.rootPath;
    this.pathFunc = options.pathFunc || md5HashFilename;
    this.fileMode = options.fileMode || null;
  }

  public abstract wrapper<T, R>(srcFunc: ISrcFunc<T, R>): ISrcFunc<T, R>;
  public abstract decorator<T>(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ): PropertyDescriptor | undefined;

  protected getFilePath(args: any[]): string {
    const filePath = this.pathFunc(args);
    return path.join(this.rootPath, filePath);
  }
}
