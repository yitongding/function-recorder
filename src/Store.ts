export interface IStore {
  has(fullPath: string): Promise<boolean>;
  get(rootDir: string, filename: string): Promise<any>;
  save(namespace: string, key: string, value: any): Promise<string>;
}

export abstract class Store implements IStore {
  public abstract has(fullPath: string): Promise<boolean>;
  public abstract get(rootDir: string, filename: string): Promise<any>;
  public abstract save(
    namespace: string,
    key: string,
    value: any
  ): Promise<string>;
}
