import { goodbyeWorld } from "../src/index.js";

describe("Goodbye World", () => {
    it("should return 'Goodbye World'", () => {
        expect(goodbyeWorld()).toBe("Goodbye World");
    });
});
