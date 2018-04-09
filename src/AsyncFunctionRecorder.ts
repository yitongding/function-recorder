import * as path from "path";
import {FunctionRecorder} from "./FunctionRecorder";
import {
  IFileMode,
  IFunctionRecorder,
  IOptions,
  IPathFunc,
  ISrcAsyncFunc,
  ISrcFunc,
} from "./types";

export class AsyncFunctionRecorder extends FunctionRecorder
  implements IFunctionRecorder {
  public wrapper<T, R>(srcFunc: ISrcAsyncFunc<T, R>): ISrcAsyncFunc<T, R> {
    return this.recordify(srcFunc);
  }

  public decorator(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ): PropertyDescriptor | undefined {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    if (descriptor === undefined || typeof descriptor.value !== "function") {
      return descriptor;
    }

    const originalMethod = descriptor.value;

    descriptor.value = this.recordify(originalMethod);

    return descriptor;
  }

  private recordify<T, R>(srcFunc: ISrcAsyncFunc<T, R>): ISrcAsyncFunc<T, R> {
    const func: ISrcAsyncFunc<T, R> = async (...args) => {
      const result = await srcFunc(...args);
      return result;
    };
    return func;
  }


}
