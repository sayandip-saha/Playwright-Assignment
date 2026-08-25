// @ts-check

import { test, expect } from "@playwright/test";
import users from "../../data/users.js";
import LoginPage from "../../pages/LoginPage.js";
import InventoryPage from "../../pages/InventoryPage.js";

test.describe("Login Functionality", () => {
  test("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    const user = users.standardUser;
    await loginPage.login(user.username, user.password);
    // Verify successful login
    await expect(page).toHaveURL(/inventory/);
    // Verify Products page
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });

  test("Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalid_user", "invalid_password");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("Login with invalid username", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const user = users.standardUser;
    await loginPage.login("invalid_user", user.password);
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("Login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const user = users.standardUser;
    await loginPage.login(user.username, "invalid_password");
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("Login with empty username and password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clickLogin();
    // Verify user remains on login page
    await expect(page).toHaveURL(
      "https://app.thetestingacademy.com/playwright/ttacart/",
    );
    // Verify browser native validation
    const validationMessage = await loginPage.getUsernameValidationMessage();
    expect(validationMessage).toBe("Please fill out this field.");
  });
});
