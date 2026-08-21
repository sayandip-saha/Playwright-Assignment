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

test("Login failure - invalid username", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  // Verify error container appears and contains correct message
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login failure - invalid password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill("wrong_password");
  await page.locator("#login-button").click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login failure - invalid username and password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("wrong_password");
  await page.locator("#login-button").click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Login failure - empty credentials (HTML5 validation)", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click login without entering credentials
  await page.locator("#login-button").click();

  // Retrieve the HTML5 validation message from the username input field
  const usernameInput = page.locator("#user-name");
  
  // Assert the browser's native validation message
  const validationMessage = await usernameInput.evaluate((el) => /** @type {HTMLInputElement} */ (el).validationMessage);
  expect(validationMessage).toBe("Please fill out this field.");

  // Alternatively, assert the native required flag state
  const isInvalid = await usernameInput.evaluate((el) => /** @type {HTMLInputElement} */ (el).validity.valueMissing);
  expect(isInvalid).toBe(true);
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
