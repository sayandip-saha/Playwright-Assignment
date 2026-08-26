// @ts-check

import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage.js";

test.describe("Login Page UI", () => {
  /** @type {LoginPage} */
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Show Login page header and form", async () => {
    // Brand title
    await expect(loginPage.brandTitle).toHaveText("TTACart");
    // Login card
    await expect(loginPage.loginCard).toBeVisible();
    // Username
    await expect(loginPage.usernameInput).toBeVisible();
    // Password
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("Show Login hint and button", async () => {
    // Login hint
    await expect(loginPage.loginHint).toHaveText(/Accepted usernames are:/);
    await expect(loginPage.loginHint).toHaveText(/Password for all users:/);
    // Login button
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText("Login");
  });
});
