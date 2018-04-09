import { wrapper } from "../src/index";

describe("wrapper", () => {
  it("log", () => {
    const srcFunc = () => true;
    const wrapperInst = wrapper("test");
    const wrappedFunc = wrapperInst(srcFunc);
    expect(wrappedFunc()).toBe(true);
  });
});
