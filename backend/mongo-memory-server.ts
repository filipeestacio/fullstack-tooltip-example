import { afterAll, beforeAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";
import mongoose from "mongoose";

beforeAll(async () => {
    await setup();
    await mongoose.connect(globalThis.__MONGO_URI__);
});

afterAll(async () => {
    await teardown();
    await mongoose.disconnect();
});