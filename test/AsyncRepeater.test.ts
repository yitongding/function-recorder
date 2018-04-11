import { AsyncRecorder } from "../src/AsyncRecorder";
import { AsyncRepeater } from "../src/AsyncRepeater";
import { FileStore } from "../src/FileStore";

const rootDir = "./mock/";

describe("FileStore", () => {
  it("should save file", async () => {
    let counter = 0;
    const testAsyncFunc = async (arg: string) => {
      return ++counter;
    };

    const fileStore = new FileStore();
    const asyncRecorder = new AsyncRecorder({
      rootPath: rootDir,
      store: fileStore
    });

    const asyncRepeater = new AsyncRepeater({
      rootPath: rootDir,
      store: fileStore
    });

    const recordifiedFunc = asyncRecorder.wrap(testAsyncFunc);
    const repeadifiedFunc = asyncRepeater.wrap(recordifiedFunc);

    const firstResult = await repeadifiedFunc("fileStore1");
    const secondResult = await repeadifiedFunc("fileStore1");
    const thirdResult = await repeadifiedFunc("fileStore2");

    expect(firstResult).toBe(1);
    expect(secondResult).toBe(1);
    expect(thirdResult).toBe(2);
  });
});
