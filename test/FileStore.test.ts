import { FileStore } from "../src/FileStore";

const rootDir = "./mock/";

describe("FileStore", () => {
  it("should save file", async () => {
    const fileStore = new FileStore();
    const fileName = "test_1.json";
    const filePath = await fileStore.save(rootDir, fileName, { test: 1 });
    expect(filePath).toContain(fileName);
  });
});
