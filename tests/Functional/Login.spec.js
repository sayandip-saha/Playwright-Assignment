// @ts-check
import { test, expect } from "@playwright/test";
import users from "../../data/users.js";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/";

test("Login", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/TTACart/);
});

test("Logout", async ({ page }) => {
  await page.goto(BASE_URL);

  // Authenticate first
  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  // Open sidebar menu and logout
  await page.locator("#react-burger-menu-btn").click();
  await page.locator("#logout_sidebar_link").click();

  await expect(page).toHaveURL(BASE_URL);
  await expect(page.locator("#login-button")).toBeVisible();
});
