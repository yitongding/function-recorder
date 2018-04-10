import { Recorder, IRecorder } from "./Recorder";

export class AsyncRecorder extends Recorder implements IRecorder {
  public wrap<T extends Function>(srcFunc: T): T {
    return this.recordify(srcFunc);
  }

  public decorate(
    target: any,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor
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

  private recordify<T extends Function>(srcFunc: T): T {
    const func = async (...args: any[]) => {
      const result = await srcFunc(...args);
      await this.record(args, result);
      return result;
    };
    return <any>func;
  }

  private async record(args: any[], data: any): Promise<string> {
    const key = this.getStoreKey(args);
    return await this.store.save(this.rootPath, key, data);
  }
}
