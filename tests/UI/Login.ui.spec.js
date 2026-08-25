// @ts-check

import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage.js";

test.describe("Login Page UI", () => {
  test("Show home page title", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.brandTitle).toHaveText("TTACart");
  });

  test("Show Login card", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginCard).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("Show Login hint", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginHint).toHaveText(/Accepted usernames are:/);
    await expect(loginPage.loginHint).toHaveText(/Password for all users:/);
  });

  test("Show Login button", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText("Login");
  });
});
