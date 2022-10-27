import { dir as getTmpDir } from "tmp-promise";
import { describe, expect, test } from "vitest";
import { copyFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("working", async () => {
  const { path: tmpDir, cleanup } = await getTmpDir({
    prefix: "vitest-abosulte-path",
  });
  console.log(tmpDir);
  copyFile(join(__dirname, "fixture.js"), join(tmpDir, "./fixture.js"));
  copyFile(join(__dirname, "fixture2.js"), join(tmpDir, "./fixture2.js"));

  // Workaround using /@fs/
  const result = await import(join("/@fs/", tmpDir, "./fixture.js"));

  expect(result.default).toBe(2);
});
