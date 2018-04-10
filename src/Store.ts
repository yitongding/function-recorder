export interface IStore {
  save(namespace:string, key: string, value: any): Promise<string>;
}

export abstract class Store implements IStore {
  constructor() {

  }

  public abstract save(namespace:string, key: string, value: any): Promise<string>;
}
