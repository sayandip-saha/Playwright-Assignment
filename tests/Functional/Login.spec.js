// @ts-check
import { test, expect } from "@playwright/test";
import users from "../../data/users.js";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/";

test("Login with valid credentials", async ({ page }) => {
  await page.goto(BASE_URL);

  const user = users.standardUser;

  await page.locator("#user-name").fill(user.username);
  await page.locator("#password").fill(user.password);

  await page.locator("#login-button").click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory/);

  // Verify Products page
  await expect(page.locator(".page-title")).toHaveText("Products");
});

test("Login with invalid credentials", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("invalid_password");

  await page.locator("#login-button").click();

  // Verify error message
  await expect(page.getByRole("alert")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login with invalid username", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("valid_password");

  await page.locator("#login-button").click();

  // Verify error message
  await expect(page.getByRole("alert")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login with invalid password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("valid_user");
  await page.locator("#password").fill("invalid_password");

  await page.locator("#login-button").click();

  // Verify error message
  await expect(page.getByRole("alert")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login with empty username and password", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click Login without entering anything
  await page.locator("#login-button").click();

  // Verify user remains on login page
  await expect(page).toHaveURL(BASE_URL);

  const username = page.locator("#user-name");

  // Verify the browser's native validation message
  const validationMessage = await username.evaluate(
    /** @param {HTMLInputElement} input */
    (input) => input.validationMessage,
  );

  expect(validationMessage).toBe("Please fill out this field.");
});
