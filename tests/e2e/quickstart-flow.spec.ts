import { test, expect } from "@playwright/test";

test("quickstart flow placeholder", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.*/);
});
