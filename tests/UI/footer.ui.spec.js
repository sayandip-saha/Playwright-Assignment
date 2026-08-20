/*// @ts-check
import { test, expect } from "@playwright/test";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/inventory";

test("show footer icons", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.getByRole("link", { name: "Twitter" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Facebook" })).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
});

test("show login card", async ({ page }) => {
  await page.goto(BASE_URL);

  page.locator(".login-card");
  await expect(page.locator("#user-name")).toBeVisible();
  await expect(page.locator("#password")).toBeVisible();
});

test("show login hint", async ({ page }) => {
  await page.goto(BASE_URL);

  page.locator(".login-hint");
  await expect(page.locator(".login-hint")).toHaveText(/Accepted usernames are:/);
  await expect(page.locator(".login-hint")).toHaveText(/Password for all users:/);
});

test("Show Login button", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#login-button").click();

  await expect(page.locator("#login-button")).toHaveText("Login");
});
*/