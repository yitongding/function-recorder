import { IRepeater, Repeater } from "./Repeater";

export class AsyncRepeater extends Repeater implements IRepeater {
  public wrap<T extends Function>(srcFunc: T): T {
    return this.repeatify(srcFunc);
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

    descriptor.value = this.repeatify(originalMethod);

    return descriptor;
  }

  private repeatify<T extends Function>(srcFunc: T): T {
    const func = async (...args: any[]) => {
      try {
        const result = await this.repeat(args);
        return result;
      } catch (err) {
        return await srcFunc(...args);
      }
    };
    return <any>func;
  }

  private async repeat(args: any[]): Promise<any> {
    const key = this.getStoreKey(args);
    return await this.store.get(this.rootPath, key);
  }
}
