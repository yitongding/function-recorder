export type IPathFunc = (args: any[]) => string;
export type IFileMode = number | string | null;

export interface IOptions {
  rootPath: string;
  pathFunc?: IPathFunc;
  fileMode?: IFileMode;
}

export type IArgs<T> = T[];
export type ISrcSyncFunc<T, R> = (...args: IArgs<T>) => R;
export type ISrcAsyncFunc<T, R> = (...args: IArgs<T>) => Promise<R>;
export type ISrcFunc<T, R> = ISrcSyncFunc<T, R> | ISrcAsyncFunc<T, R>;

export interface IFunctionRecorder {
  wrapper<T, R>(srcFunc: ISrcFunc<T, R>): ISrcFunc<T, R>;
  decorator<T>(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ): PropertyDescriptor | undefined;
}
