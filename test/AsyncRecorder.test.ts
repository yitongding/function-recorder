import { AsyncRecorder } from "../src/AsyncRecorder";
import { FileStore } from "../src/FileStore";

const rootDir = "./mock/";

const testAsyncFunc = async (arg:string) => {
  return arg;
};

describe("FileStore", () => {
  it("should save file", async () => {
    const fileStore = new FileStore();
    const asyncRecorder = new AsyncRecorder({
      rootPath: rootDir,
      store: fileStore
    });

    const wrappedFunc = asyncRecorder.wrap(testAsyncFunc);
    const result = await wrappedFunc('test');

    // expect(fileStore.has()).toContain(fileName);
  });
});
